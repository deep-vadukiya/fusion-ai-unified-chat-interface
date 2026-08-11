//

import mongoose from "mongoose";

// ----------------------------------------------

const chatSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    is_archived: {
      type: Boolean,
      default: false,
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

const Chats = mongoose.model("chats", chatSchema);

export default Chats;
