//

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsageSchema = new Schema(
  {
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

    cached_input_tokens: {
      type: Number,
      default: 0,
      min: 0,
    },

    cached_output_tokens: {
      type: Number,
      default: 0,
      min: 0,
    },

    total_tokens: {
      type: Number,
      default: 0,
      min: 0,
    },

    prompt_characters: {
      type: Number,
      default: 0,
      min: 0,
    },

    response_characters: {
      type: Number,
      default: 0,
      min: 0,
    },

    prompt_words: {
      type: Number,
      default: 0,
      min: 0,
    },

    response_words: {
      type: Number,
      default: 0,
      min: 0,
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

export default UsageSchema;
