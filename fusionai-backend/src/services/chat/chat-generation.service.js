//

import Chats from "../../models/chats/chats.model.js";
import Prompts from "../../models/chats/prompts.model.js";

// ----------------------------------------------

const generateChatTitle = (message) => {
  return message.trim().replace(/\s+/g, " ").substring(0, 50);
};

export const generateChat = async ({
  chat_id,
  user_id,
  message,
  personality_id = null,
}) => {
  let chat;

  if (!chat_id) {
    chat = await Chats.create({
      user_id,
      title: generateChatTitle(message),
    });
  } else {
    chat = await Chats.findById(chat_id);

    if (!chat) {
      throw new Error("Chat not found.");
    }
  }

  const promptNumber =
    (await Prompts.countDocuments({
      chat_id: chat._id,
    })) + 1;

  const prompt = await Prompts.create({
    chat_id: chat._id,
    user_id,
    personality_id,
    prompt_number: promptNumber,
    content: message,
    status: "pending",
  });

  return {
    chat,
    prompt,
  };
};
