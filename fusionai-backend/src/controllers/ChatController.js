//

import { generateChat } from "../services/chat/chat-generation.service.js";

// ----------------------------------------------

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
