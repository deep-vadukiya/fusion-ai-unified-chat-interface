//

import mongoose from "mongoose";

const { Schema } = mongoose;

const OverallAnalyticsSchema = new Schema(
  {
    execution: {
      total_providers: {
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

      timeout_executions: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    tokens: {
      input_tokens: {
        type: Number,
        default: 0,
        min: 0,
      },

      output_tokens: {
        type: Number,
        default: 0,
        min: 0,
      },

      reasoning_tokens: {
        type: Number,
        default: 0,
        min: 0,
      },

      cached_tokens: {
        type: Number,
        default: 0,
        min: 0,
      },

      total_tokens: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    cost: {
      input_cost: {
        type: Number,
        default: 0,
        min: 0,
      },

      output_cost: {
        type: Number,
        default: 0,
        min: 0,
      },

      total_cost: {
        type: Number,
        default: 0,
        min: 0,
      },

      currency: {
        type: String,
        default: "USD",
        uppercase: true,
        trim: true,
      },
    },

    latency: {
      total_latency_ms: {
        type: Number,
        default: 0,
        min: 0,
      },

      average_latency_ms: {
        type: Number,
        default: 0,
        min: 0,
      },

      fastest_latency_ms: {
        type: Number,
        default: 0,
        min: 0,
      },

      slowest_latency_ms: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    response: {
      total_characters: {
        type: Number,
        default: 0,
        min: 0,
      },

      total_words: {
        type: Number,
        default: 0,
        min: 0,
      },

      total_sentences: {
        type: Number,
        default: 0,
        min: 0,
      },

      total_paragraphs: {
        type: Number,
        default: 0,
        min: 0,
      },

      total_code_blocks: {
        type: Number,
        default: 0,
        min: 0,
      },

      average_reading_time_seconds: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    cache: {
      cached_responses: {
        type: Number,
        default: 0,
        min: 0,
      },

      non_cached_responses: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    generated_at: {
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

export default OverallAnalyticsSchema;
