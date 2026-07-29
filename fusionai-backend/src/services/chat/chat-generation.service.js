//

import Chats from "../../models/chats/chats.model.js";
import Prompts from "../../models/chats/prompts.model.js";
import Executions from "../../models/chats/executions.model.js";

import Personalities from "../../models/personality.schema.js";

import OpenAIProvider from "../providers/OpenAIProvider.js";

// ----------------------------------------------

const generateChatTitle = (message) => {
  return message.trim().replace(/\s+/g, " ").substring(0, 60);
};

export const generateChat = async ({
  req,
  res,
  user_id,
  chat_id,
  message,
  personality_id,
}) => {
  try {
    const { message, personality_id, provider, model } = req.body;

    // SSE Headers ...
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    // Resolve Chat ...
    let chat;
    if (chat_id) {
      chat = await Chats.findById(chat_id);
      if (!chat) throw new Error("Chat not found.");
    } else {
      chat = await Chats.create({
        user_id: req.user._id,
        title: generateChatTitle(message),
      });
    }

    // Create Prompt ...
    const promptNumber = await Prompts.countDocuments({ chat_id: chat._id });

    const prompt = await Prompts.create({
      chat_id: chat._id,
      user_id: req.user._id,
      personality_id,
      prompt_number: promptNumber + 1,
      role: "user",
      content: message,
      status: "processing",
    });

    // Create Execution ...

    const execution = await Executions.create({
      prompt_id: prompt._id,
      provider,
      model,
      status: "processing",
    });

    // Send Session ...
    res.write(
      `event: session
data: ${JSON.stringify({
        chat_id: chat._id,
        prompt_id: prompt._id,
        execution_id: execution._id,
      })}

`,
    );

    // Personality ...
    const personality = personality_id
      ? await Personalities.findById(personality_id)
      : null;

    // Messages ...
    const messages = [];
    if (personality) {
      messages.push({
        role: "system",
        content: personality.system_prompt,
      });
    }

    messages.push({
      role: "user",
      content: message,
    });

    // Stream ...
    let assistantResponse = "";
    let usage = {};

    const stream = await OpenAIProvider.stream({
      model,
      messages,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? "";
      assistantResponse += delta;

      res.write(
        `event: token
data: ${JSON.stringify({
          execution_id: execution._id,

          content: delta,
        })}

`,
      );

      if (chunk.usage) {
        usage = chunk.usage;
      }
    }

    // Save Execution ...
    execution.status = "completed";
    execution.response = {
      role: "assistant",
      content: assistantResponse,
    };

    execution.usage = usage;
    await execution.save();

    // Update Prompt ...
    prompt.status = "completed";
    await prompt.save();

    // Done ...
    res.write(
      `event: done
data: {}

`,
    );

    res.end();
  } catch (err) {
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};
