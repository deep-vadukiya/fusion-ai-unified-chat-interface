//

import OpenAI from "openai";
import crypto from "crypto";
import env from "../../config/env.js";

// ----------------------------------------------

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export default async function OpenAIProvider({ prompt, model }) {
  const startedAt = Date.now();

  // api response stream ...
  const responseStream = await client.responses.create({
    model,
    input: [
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
    max_output_tokens: 128,
  });

  // formatted respose structure ...
  const result = {
    id: crypto.randomUUID(),

    provider: {
      provider: "openai",
      model,
    },

    request: { prompt },

    response: { content: "" },

    usage: {
      input_tokens: 0,
      output_tokens: 0,
      reasoning_tokens: 0,
      total_tokens: 0,
    },

    finish_reason: null,

    status: "running",

    timing: {
      started_at: startedAt,
      first_token_at: null,
      completed_at: null,
      duration_ms: 0,
    },

    metadata: {},
  };

  let resolveComplete;

  const completed = new Promise((resolve) => {
    resolveComplete = resolve;
  });

  return {
    stream: streamResponse(responseStream, result, startedAt, resolveComplete),
    result,
    complete: () => completed,
  };
}

async function* streamResponse(
  responseStream,
  result,
  startedAt,
  resolveComplete,
) {
  try {
    for await (const event of responseStream) {
      switch (event.type) {
        case "response.output_text.delta": {
          result.response.content += event.delta;

          yield {
            provider: "openai",
            type: "token",
            content: event.delta,
          };

          break;
        }

        case "response.completed": {
          const usage = event.response?.usage;

          result.usage = {
            input_tokens: usage?.input_tokens ?? 0,
            output_tokens: usage?.output_tokens ?? 0,
            reasoning_tokens:
              usage?.output_tokens_details?.reasoning_tokens ?? 0,
            total_tokens: usage?.total_tokens ?? 0,
          };

          result.finish_reason = event.response?.status ?? "completed";

          result.timing.completed_at = new Date();

          result.timing.duration_ms = Date.now() - startedAt;

          yield {
            provider: "openai",
            type: "completed",
          };

          break;
        }

        case "response.failed": {
          yield {
            provider: "openai",
            type: "error",
            message: "OpenAI request failed.",
          };

          break;
        }

        default:
          break;
      }
    }
  } finally {
    resolveComplete(result);
  }
}
