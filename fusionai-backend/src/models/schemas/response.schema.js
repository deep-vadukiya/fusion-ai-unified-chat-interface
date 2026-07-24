//

import mongoose from "mongoose";
import { randomUUID } from "crypto";

const { Schema } = mongoose;

const ResponseSchema = new Schema(
  {
    response_id: {
      type: String,
      default: () => randomUUID(),
      immutable: true,
    },

    provider_response_id: {
      type: String,
      default: "",
      trim: true,
    },

    role: {
      type: String,
      enum: ["assistant", "tool", "system"],
      default: "assistant",
    },

    content: {
      type: String,
      default: "",
    },

    finish_reason: {
      type: String,
      enum: [
        "stop",
        "length",
        "tool_calls",
        "content_filter",
        "error",
        "unknown",
      ],
      default: "unknown",
    },

    stop_sequence: {
      type: String,
      default: "",
    },

    refusal: {
      type: Boolean,
      default: false,
    },

    citations: {
      type: [String],
      default: [],
    },

    tool_calls: {
      type: [Schema.Types.Mixed],
      default: [],
    },

    thinking: {
      type: String,
      default: "",
    },

    provider_response: {
      type: Schema.Types.Mixed,
      default: {},
    },

    received_at: {
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

export default ResponseSchema;
