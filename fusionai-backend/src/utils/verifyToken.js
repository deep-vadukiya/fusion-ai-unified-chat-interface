//

import jwt from "jsonwebtoken";
import Session from "../models/sessions.js";
import User from "../models/users.js";
import env from "../config/env.js";

// ----------------------------------------------

const SECRET_KEY = env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
  // check header parameters for token ...
  // and get the token by splitting "Bearer" ...
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: 1, message: "Authorization token not provided." });
  }

  // decode token
  if (token) {
    // check token expiration
    const isTokenExpired = (token) => {
      return (
        Date.now() >=
        JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp *
          1000
      );
    };

    if (isTokenExpired(token)) {
      return res.status(401).json({
        status: 0,
        message: "You're logged out, please login again ...!",
      });
    }

    const sessoin = await Session.findOne({ access_token: token });

    if (!sessoin) {
      return res.status(401).json({
        status: 0,
        message: "Invalid access token provided ...!",
      });
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decodedToken.id);

    if (!decodedToken) {
      res.sendStatus(401);
    } else {
      req.user = user;
      next();
    }
  } else {
    res
      .sendStatus(403)
      .json({ status: 0, message: "Authentication failed ..." });
  }
};

export default verifyToken;
