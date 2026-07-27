//

import mongoose from "mongoose";
import { randomUUID } from "crypto";

const Schema = mongoose.Schema;

import RequestSchema from "./request.schema.js";
import ResponseSchema from "./response.schema.js";
import UsageSchema from "./usage.schema.js";
import TimingSchema from "./timing.schema.js";
import PricingSchema from "./pricing.schema.js";
import AnalyticsSchema from "./overallanalytics.schema.js";
import ErrorSchema from "./error.schema.js";

const ExecutionSchema = new Schema(
  {
    executionId: {
      type: String,
      default: () => randomUUID(),
      immutable: true,
    },

    provider: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
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
    },

    model: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    modelVersion: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    providerRequestId: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
        "cancelled",
        "timeout",
      ],
      default: "pending",
    },

    request: {
      type: RequestSchema,
      required: true,
    },

    response: {
      type: ResponseSchema,
      default: {},
    },

    usage: {
      type: UsageSchema,
      default: {},
    },

    timing: {
      type: TimingSchema,
      default: {},
    },

    pricing: {
      type: PricingSchema,
      default: {},
    },

    analytics: {
      type: AnalyticsSchema,
      default: {},
    },

    error: {
      type: ErrorSchema,
      default: {},
    },

    retryCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isCached: {
      type: Boolean,
      default: false,
    },

    streamed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
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

export default ExecutionSchema;
