//

import mongoose from "mongoose";
import { randomUUID } from "crypto";

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

import PromptDataSchema from "./schemas/promptdata.schema";
import ExecutionSchema from "./schemas/execution.schema";
import ComparisonSchema from "./schemas/comparison.schema";
import OverallAnalyticsSchema from "./schemas/overallanalytics.schema";
import UsageSchema from "./schemas/usage.schema";

const PromptSchema = new Schema(
  {
    request_id: {
      type: String,
      default: () => randomUUID(),
      unique: true,
      immutable: true,
      index: true,
    },

    chat_id: {
      type: ObjectId,
      ref: "chat",
      required: true,
      index: true,
    },

    user_id: {
      type: ObjectId,
      ref: "user",
      required: true,
      index: true,
    },

    prompt_number: {
      type: Number,
      required: true,
      min: 1,
    },

    title: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "cancelled"],
      default: "pending",
      index: true,
    },

    personality: {
      type: ObjectId,
      ref: "personality",
      required: true,
      index: true,
    },

    providers_requested: [
      {
        type: String,
        enum: ["openai", "claude", "gemini", "grok", "mistral", "llama"],
        lowercase: true,
      },
    ],

    prompt: {
      type: PromptDataSchema,
      required: true,
    },

    executions: {
      type: [ExecutionSchema],
      default: [],
      validate: {
        validator: function (value) {
          return value.length <= 10;
        },
        message: "Maximum 10 provider executions are allowed.",
      },
    },

    comparison: {
      type: ComparisonSchema,
      default: {},
    },

    overall_analytics: {
      type: OverallAnalyticsSchema,
      default: {},
    },

    usage: {
      type: UsageSchema,
      default: {},
    },

    metadata: {
      ip_address: {
        type: String,
        default: "",
      },

      user_agent: {
        type: String,
        default: "",
      },

      source: {
        type: String,
        enum: ["web", "mobile", "api"],
        default: "web",
      },
    },

    is_deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,

    versionKey: false,

    minimize: false,
  },
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

PromptSchema.index({ chat_id: 1, prompt_number: 1 });

PromptSchema.index({ user_id: 1, created_at: -1 });

PromptSchema.index({ request_id: 1 });

PromptSchema.index({ "executions.provider": 1 });

PromptSchema.index({ "executions.model": 1 });

PromptSchema.index({ created_at: -1 });

export default PromptSchema;
