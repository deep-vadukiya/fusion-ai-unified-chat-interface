//

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ComparisonSchema = new Schema(
  {
    providers_compared: [
      {
        type: String,
        enum: [
          "openai",
          "claude",
          "gemini",
          "grok",
          "mistral",
          "llama",
          "deepseek",
          "custom",
        ],
        lowercase: true,
      },
    ],

    summary: {
      totalProviders: {
        type: Number,
        default: 0,
        min: 0,
      },

      successful_executions: {
        type: Number,
        default: 0,
        min: 0,
      },

      failed_executions: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    latency: {
      fastest_provider: {
        type: String,
        default: "",
      },

      slowest_provider: {
        type: String,
        default: "",
      },

      fastest_ms: {
        type: Number,
        default: 0,
        min: 0,
      },

      slowest_ms: {
        type: Number,
        default: 0,
        min: 0,
      },

      average_ms: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    tokens: {
      highest_provider: {
        type: String,
        default: "",
      },

      lowest_provider: {
        type: String,
        default: "",
      },

      highest_tokens: {
        type: Number,
        default: 0,
      },

      lowest_tokens: {
        type: Number,
        default: 0,
      },

      total_tokens: {
        type: Number,
        default: 0,
      },
    },

    cost: {
      cheapest_provider: {
        type: String,
        default: "",
      },

      expensive_provider: {
        type: String,
        default: "",
      },

      lowest_cost: {
        type: Number,
        default: 0,
      },

      highest_cost: {
        type: Number,
        default: 0,
      },

      total_cost: {
        type: Number,
        default: 0,
      },

      currency: {
        type: String,
        default: "USD",
        uppercase: true,
      },
    },

    response: {
      longest_provider: {
        type: String,
        default: "",
      },

      shortest_provider: {
        type: String,
        default: "",
      },

      longest_words: {
        type: Number,
        default: 0,
      },

      shortest_words: {
        type: Number,
        default: 0,
      },

      average_words: {
        type: Number,
        default: 0,
      },
    },

    winner: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    comparison_version: {
      type: Number,
      default: 1,
    },

    generated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
    minimize: false,
  },
);

export default ComparisonSchema;
