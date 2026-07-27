//

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/users.js";
import Session from "../models/sessions.js";
import env from "../config/env.js";

// ----------------------------------------------

const SECRET_KEY = env.JWT_SECRET_KEY;

export const singUp = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  if (email && first_name && last_name && password) {
    try {
      const user = new User({
        email,
        first_name,
        last_name,
        password: bcrypt.hashSync(password, 16),
      });

      const newUser = await user.save();

      res.status(201).json({
        status: 1,
        message: "User creatioon success ...!",
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "Something went wrong while user creatioon ...!",
        user: null,
      });
    }
  }
};

export const signIn = async (req, res) => {
  const { email, password, is_browser, is_mobile, device_id, platform } =
    req.body;

  try {
    if (email && password) {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        res.status(404).json({ status: 0, message: "Oops, No user found" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (isPasswordValid) {
        const token_expires_in = 86400; // 24 hours

        const userData = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          token_expires_in,
        };

        const token = jwt.sign(userData, SECRET_KEY, {
          expiresIn: token_expires_in,
        });

        // save the users active session
        const newSession = new Session({
          user_id: user._id,
          access_token: token,
          is_browser: Boolean(is_browser),
          is_mobile: Boolean(is_mobile),
          device_id: String(device_id),
          platform,
        });

        await newSession.save();

        // remove the password from the users data to pass as a response ...
        const { password, ...userInfo } = user.toObject();
        res.status(200).json({
          status: 1,
          message: "User login success ...!",
          user: userInfo,
          token,
          token_expires_in,
        });
      } else {
        res
          .status(500)
          .json({ status: 0, message: "Something went wrong during log in" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 0, message: "Something went wrong during log in" });
  }
};
