//

import mongoose from "mongoose";
import { randomUUID } from "crypto";

const { Schema } = mongoose;

const AttachmentSchema = new Schema(
  {
    attachment_id: {
      type: String,
      default: () => randomUUID(),
      immutable: true,
    },

    file_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    original_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    extension: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
      maxlength: 20,
    },

    mime_type: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    file_type: {
      type: String,
      enum: [
        "image",
        "document",
        "audio",
        "video",
        "spreadsheet",
        "presentation",
        "archive",
        "text",
        "json",
        "other",
      ],
      default: "other",
    },

    file_size: {
      type: Number,
      required: true,
      min: 0,
    },

    storage: {
      provider: {
        type: String,
        enum: ["local", "aws_s3", "cloudinary", "gcp_storage", "azure_blob"],
        default: "local",
      },

      bucket: {
        type: String,
        default: "",
        trim: true,
      },

      path: {
        type: String,
        required: true,
        trim: true,
      },

      url: {
        type: String,
        default: "",
        trim: true,
      },

      is_public: {
        type: Boolean,
        default: false,
      },
    },

    image: {
      width: {
        type: Number,
        default: 0,
        min: 0,
      },

      height: {
        type: Number,
        default: 0,
        min: 0,
      },

      format: {
        type: String,
        default: "",
        lowercase: true,
      },
    },

    checksum: {
      type: String,
      default: "",
      trim: true,
      maxlength: 255,
    },

    metadata: {
      duration_seconds: {
        type: Number,
        default: 0,
        min: 0,
      },

      pages: {
        type: Number,
        default: 0,
        min: 0,
      },

      encoding: {
        type: String,
        default: "",
      },
    },

    uploaded_at: {
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

export default AttachmentSchema;
