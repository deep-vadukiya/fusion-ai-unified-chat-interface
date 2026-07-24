//

import mongoose from "mongoose";

const { Schema } = mongoose;

const PricingSchema = new Schema(
  {
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
      trim: true,
    },

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

    reasoning_cost: {
      type: Number,
      default: 0,
      min: 0,
    },

    cache_cost: {
      type: Number,
      default: 0,
      min: 0,
    },

    total_cost: {
      type: Number,
      default: 0,
      min: 0,
    },

    pricing_model: {
      type: String,
      enum: ["token_based", "request_based", "subscription", "free", "unknown"],
      default: "token_based",
    },

    provider_pricing: {
      type: Schema.Types.Mixed,
      default: {},
    },

    calculated_at: {
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

export default PricingSchema;
