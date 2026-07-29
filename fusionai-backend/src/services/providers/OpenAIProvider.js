//

import OpenAI from "openai";
import env from "../../config/env.js";

// ----------------------------------------------

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const stream = async ({ model, messages }) => {
  const str = await client.chat.completions.create({
    model,
    messages,
    stream: true,
    stream_options: {
      include_usage: true,
    },
    max_completion_tokens: 128,
  });

  return str;
};

export default { stream };
