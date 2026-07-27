//

import OpenAIProvider from "./providers/OpenAIProvider.js";
import * as ClaudeAIProvider from "./providers/ClaudeAIProvider.js";

// ----------------------------------------------

class ChatService {
  async createPrompt(payload) {
    const { prompt, providers, personality_id, chat_id } = payload;

    // select provider ...
    const selectedProvider = providers[0];

    // build prompt ...
    const finalPrompt = prompt;

    // execute provider ...
    switch (selectedProvider.provider) {
      case "openai":
        return await OpenAIProvider({
          chat_id,
          prompt: finalPrompt,
          model: selectedProvider.model,
          personality_id,
        });

      case "claude":
        return ClaudeAIProvider.execute({
          prompt,
          model: selectedProvider.model,
          personality_id,
          chat_id,
        });

      default:
        throw new Error(
          `Provider '${selectedProvider.provider}' is not supported.`,
        );
    }
  }
}

export default new ChatService();
