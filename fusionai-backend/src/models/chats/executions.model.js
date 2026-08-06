//

import mongoose from "mongoose";

// ----------------------------------------------

const executionSchema = new mongoose.Schema(
  {
    prompt_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "prompts",
      required: true,
    },

    provider: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },

    response: {
      role: {
        type: String,
        default: 0,
      },

      content: {
        type: String,
        default: 0,
      },
    },

    usage: {
      input_tokens: {
        type: Number,
        default: 0,
      },

      output_tokens: {
        type: Number,
        default: 0,
      },

      total_tokens: {
        type: Number,
        default: 0,
      },
    },

    pricing: {
      total_cost: {
        type: Number,
        default: 0,
      },

      currency: {
        type: String,
        default: "USD",
      },
    },

    timing: {
      total_time_ms: {
        type: Number,
        default: 0,
      },

      first_token_ms: {
        type: Number,
        default: 0,
      },
    },

    error: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Executions = mongoose.model("executions", executionSchema);

export default Executions;
