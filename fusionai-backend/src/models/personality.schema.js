//

import mongoose from "mongoose";

// ----------------------------------------------

const { Schema } = mongoose;

const PersonalitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    system_prompt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Personalities = mongoose.model("personalities", PersonalitySchema);

export default Personalities;
