//

import mongoose from "mongoose";

// ----------------------------------------------

const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

// TODO: try to run the cron job in furure to deactivate the users old sessions ...
const SessionSchema = new Schema({
  user_id: { type: ObjectId, ref: "user", required: true },
  access_token: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  is_browser: { type: Boolean, default: false },
  is_mobile: { type: Boolean, default: false },
  device_id: { type: String },
  platform: { type: String },
  last_active: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
});

const Session = mongoose.model("sessoin", SessionSchema);
export default Session;
