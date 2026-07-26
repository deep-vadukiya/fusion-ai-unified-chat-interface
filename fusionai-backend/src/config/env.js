//

import dotenv from "dotenv";

// ----------------------------------------------

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 5000,

  MONGODB_URI: process.env.MONGODB_URI,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,

  CLIENT_URL: process.env.CLIENT_URL || "*",
};

export default env;
