//

import OpenAI from "openai";
import env from "../../config/env.js";

// ----------------------------------------------

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const stream = async ({ model, messages }) => {
  return await client.chat.completions.create({
    model,

    messages,

    stream: true,

    stream_options: {
      include_usage: true,
    },
  });
};

export default stream;
