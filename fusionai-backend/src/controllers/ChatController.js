//

import { generateChat } from "../services/chat/chat-generation.service.js";
import Chats from "../models/chats/chats.model.js";
import Prompts from "../models/chats/prompts.model.js";
import Executions from "../models/chats/executions.model.js";

// ----------------------------------------------

// generate new chat with prompt ...
export const generate = async (req, res) => {
  const { body, user } = req;
  const { chat_id, message, personality_id } = body;

  await generateChat({
    req,
    res,
    user_id: user._id,
    chat_id: chat_id,
    message: message,
    personality_id: personality_id,
  });
};

// get thread by chat_id ...
export const getThreads = async (req, res) => {
  try {
    const { chat_id } = req.params;

    // Get chat ...
    const chat = await Chats.findById(chat_id).lean();
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    // Get prompts ...
    const prompts = await Prompts.find({ chat_id })
      .sort({ prompt_number: 1 })
      .lean();

    // Get executions ...
    const promptIds = prompts.map((prompt) => prompt._id);
    const executions = await Executions.find({
      prompt_id: { $in: promptIds },
    }).lean();

    // Create lookup ...
    const executionMap = new Map();
    executions.forEach((execution) => {
      executionMap.set(execution.prompt_id.toString(), execution);
    });

    // Build thread ...
    const messages = [];
    for (const prompt of prompts) {
      messages.push({
        id: prompt._id,
        role: "user",
        content: prompt.content,
        status: prompt.status,
        created_at: prompt.createdAt,
      });

      const execution = executionMap.get(prompt._id.toString());
      if (execution) {
        messages.push({
          id: execution._id,
          role: execution.response?.role ?? "assistant",
          provider: execution.provider,
          model: execution.model,
          content: execution.response?.content ?? "",
          status: execution.status,
          usage: execution.usage,
          created_at: execution.created_at,
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        chat: {
          _id: chat._id,
          title: chat.title,
          created_at: chat.createdAt,
        },
        messages,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get chats list based on user_id ...
export const getChatsList = async (req, res) => {
  try {
    const { user } = req;

    // Get chats ...
    const chats = await Chats.find({ user_id: user._id })
      .sort({ created_at: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: chats.map((chat) => ({
        _id: chat._id,
        title: chat.title,
        created_at: chat.created_at,
      })),
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
