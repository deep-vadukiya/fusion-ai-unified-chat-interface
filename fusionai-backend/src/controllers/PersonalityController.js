//

import Personalities from "../models/personality.schema.js";

// ----------------------------------------------

// POST: personalities ...
export const createPersonality = async (req, res) => {
  try {
    const { name, description, category, system_prompt, is_default } = req.body;

    const personality = await Personalities.create({
      name,
      description,
      category,
      system_prompt,
      is_default,
    });

    return res.status(201).json({
      success: true,
      message: "Personality created successfully.",
      data: personality,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
