//

import mongoose from "mongoose";

const { Schema } = mongoose;

const RequestSchema = new Schema(
  {
    system_prompt: {
      type: String,
      default: "",
      trim: true,
      maxlength: 50000,
    },

    processed_prompt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100000,
    },

    temperature: {
      type: Number,
      default: 1,
      min: 0,
      max: 2,
    },

    top_p: {
      type: Number,
      default: 1,
      min: 0,
      max: 1,
    },

    max_tokens: {
      type: Number,
      default: 4096,
      min: 1,
    },

    stream: {
      type: Boolean,
      default: false,
    },

    seed: {
      type: Number,
      default: null,
    },

    stop_sequences: {
      type: [String],
      default: [],
    },

    response_format: {
      type: String,
      enum: ["text", "json", "markdown", "html"],
      default: "text",
    },

    tool_choice: {
      type: String,
      default: "none",
    },

    tools: {
      type: [String],
      default: [],
    },

    provider_parameters: {
      type: Schema.Types.Mixed,
      default: {},
    },

    requested_at: {
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

export default RequestSchema;
