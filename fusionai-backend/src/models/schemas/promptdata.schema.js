//

import mongoose from "mongoose";

const Schema = mongoose.Schema;

import AttachmentSchema from "./attachment.schema.js";

const PromptDataSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "system"],
      default: "user",
      required: true,
      lowercase: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100000,
    },

    language: {
      type: String,
      default: "en",
      lowercase: true,
      trim: true,
      maxlength: 10,
    },

    promptType: {
      type: String,
      enum: ["text", "image", "document", "audio", "video", "multimodal"],
      default: "text",
      required: true,
    },

    attachments: {
      type: [AttachmentSchema],
      default: [],
    },

    edited: {
      type: Boolean,
      default: false,
    },

    regenerated: {
      type: Boolean,
      default: false,
    },

    parentPromptId: {
      type: Schema.Types.ObjectId,
      ref: "prompt",
      default: null,
    },

    metadata: {
      clientTimestamp: {
        type: Date,
        default: null,
      },

      timezone: {
        type: String,
        default: "",
        trim: true,
        maxlength: 100,
      },

      locale: {
        type: String,
        default: "en",
        trim: true,
        maxlength: 20,
      },

      source: {
        type: String,
        enum: ["web", "mobile", "api"],
        default: "web",
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    _id: false,
    minimize: false,
  },
);

export default PromptDataSchema;
