//

import { generateChat } from "../services/chat/chat-generation.service.js";

// ----------------------------------------------

export const generate = async (req, res) => {
  const { body, user } = req;
  const { chat_id, message, personality_id } = body;

  try {
    const result = await generateChat({
      chat_id: chat_id,
      user_id: user._id,
      message: message,
      personality_id: personality_id,
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
