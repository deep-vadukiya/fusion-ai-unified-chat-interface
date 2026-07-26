//

import mongoose from "mongoose";

const { Schema } = mongoose;

const ErrorSchema = new Schema(
  {
    has_error: {
      type: Boolean,
      default: false,
    },

    error_type: {
      type: String,
      enum: [
        "validation",
        "authentication",
        "authorization",
        "rate_limit",
        "timeout",
        "network",
        "provider",
        "internal",
        "unknown",
      ],
      default: "unknown",
    },

    error_code: {
      type: String,
      default: "",
      trim: true,
    },

    error_message: {
      type: String,
      default: "",
      trim: true,
    },

    provider_error_code: {
      type: String,
      default: "",
      trim: true,
    },

    provider_error_message: {
      type: String,
      default: "",
      trim: true,
    },

    retryable: {
      type: Boolean,
      default: false,
    },

    stack_trace: {
      type: String,
      default: "",
    },

    raw_error: {
      type: Schema.Types.Mixed,
      default: {},
    },

    occurred_at: {
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

export default ErrorSchema;
