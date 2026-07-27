//

import { generateChat } from "../services/chat/chat-generation.service.js";

// ----------------------------------------------

export const generate = async (req, res) => {
  try {
    const result = await generateChat({
      chat_id: req.body.chat_id,
      user_id: req.user._id,
      message: req.body.message,
      personality_id: req.body.personality_id,
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
