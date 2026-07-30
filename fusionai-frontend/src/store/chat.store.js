//

import { create } from "zustand";

// ------------------------------------------------

const useChatStore = create((set) => ({
  currentChatId: null,
  currentPromptId: null,

  messages: [],

  isStreaming: false,

  setSession: (session) =>
    set({
      currentChatId: session.chat_id,
      currentPromptId: session.prompt_id,
    }),

  addAssistantMessage: (execution_id) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          execution_id,
          role: "assistant",
          content: "",
        },
      ],
    })),

  appendToken: (execution_id, token) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.execution_id === execution_id
          ? {
              ...message,
              content: message.content + token,
            }
          : message,
      ),
    })),

  finishStreaming: () =>
    set({
      isStreaming: false,
    }),

  startStreaming: () =>
    set({
      isStreaming: true,
    }),
}));

export default useChatStore;
