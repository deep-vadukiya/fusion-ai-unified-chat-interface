//

import dotenv from "dotenv";

// ----------------------------------------------

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,

  // db: mongodb ...
  MONGODB_URI: process.env.MONGODB_URI,

  // providers ...
  // 1. openai ...
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,

  // client url ...
  CLIENT_URL: process.env.CLIENT_URL || "*",

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

export default env;
