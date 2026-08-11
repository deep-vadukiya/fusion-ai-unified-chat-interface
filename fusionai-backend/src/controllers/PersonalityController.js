//

import Personalities from "../models/personality.schema.js";

// ----------------------------------------------

// POST: personalities ...
export const createPersonality = async (req, res) => {
  try {
    const { name, description, category, system_prompt } = req.body;

    const personality = await Personalities.create({
      name,
      description,
      category,
      system_prompt,
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

// GET: all personalities ...
export const getAllPersonalities = async (req, res) => {
  try {
    const personalities = await Personalities.find().sort({ created_at: -1 });

    return res.status(200).json({
      success: true,
      data: personalities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET: personality by id ...
export const getPersonalityById = async (req, res) => {
  try {
    const personality = await Personalities.findById(req.params.id);

    if (!personality) {
      return res.status(404).json({
        success: false,
        message: "Personality not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: personality,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT: update personality by id ...
export const updatePersonality = async (req, res) => {
  try {
    const personality = await Personalities.findById(req.params.id);

    if (!personality) {
      return res.status(404).json({
        success: false,
        message: "Personality not found.",
      });
    }

    Object.assign(personality, req.body);

    await personality.save();

    return res.status(200).json({
      success: true,
      message: "Personality updated successfully.",
      data: personality,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE: delete personality by id ...
export const deletePersonality = async (req, res) => {
  try {
    const personality = await Personalities.findById(req.params.id);

    if (!personality) {
      return res.status(404).json({
        success: false,
        message: "Personality not found.",
      });
    }

    await personality.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Personality deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
