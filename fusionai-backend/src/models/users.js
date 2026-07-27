//

import mongoose from "mongoose";

// ----------------------------------------------

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    maxLength: 100,
  },
  first_name: { type: String, default: "", maxLength: 100 },
  last_name: { type: String, default: "", maxLength: 100 },
  password: {
    type: String,
    default: "",
    maxLength: 100,
    select: false,
  },
  created: { type: Date, default: Date.now },
});

const User = mongoose.model("user", UserSchema);

export default User;
