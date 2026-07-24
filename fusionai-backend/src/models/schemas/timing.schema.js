//

import mongoose from "mongoose";

const { Schema } = mongoose;

const TimingSchema = new Schema(
  {
    requested_at: {
      type: Date,
      default: null,
    },

    started_at: {
      type: Date,
      default: null,
    },

    first_token_at: {
      type: Date,
      default: null,
    },

    completed_at: {
      type: Date,
      default: null,
    },

    queue_time_ms: {
      type: Number,
      default: 0,
      min: 0,
    },

    time_to_first_token_ms: {
      type: Number,
      default: 0,
      min: 0,
    },

    generation_time_ms: {
      type: Number,
      default: 0,
      min: 0,
    },

    total_time_ms: {
      type: Number,
      default: 0,
      min: 0,
    },

    provider_timing: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    _id: false,
    minimize: false,
  },
);

export default TimingSchema;
