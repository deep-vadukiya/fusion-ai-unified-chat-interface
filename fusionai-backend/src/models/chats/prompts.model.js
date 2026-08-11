//

import mongoose from "mongoose";

// ----------------------------------------------

const promptSchema = new mongoose.Schema(
  {
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    personality_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "personality",
      default: null,
    },

    prompt_number: {
      type: Number,
      required: true,
    },

    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    providers: {
      type: [String],
      default: [],
    },

    attachments: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },

    created_at: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    timestamps: true,
  },
);

const Prompts = mongoose.model("prompts", promptSchema);

export default Prompts;
