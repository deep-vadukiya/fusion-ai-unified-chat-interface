//

import { create } from "zustand";
import { getThread } from "../actions/promptGenerator";

// ------------------------------------------------

const useChatStore = create((set) => ({
  currentChatId: null,
  currentPromptId: null,

  messages: [],

  isStreaming: false,

  // threads ...
  isLoading: false,
  currentChat: null,
  thread: [],

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

  // thread ...

  isLoadingThread: () => {
    set({
      isLoading: true,
      thread: [],
    });
  },

  getChatThread: async (chatId) => {
    try {
      set({ isLoading: true });

      const { data } = await getThread(chatId);

      set({
        currentChat: data?.chat,
        thread: data?.messages,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        isLoading: false,
      });
    }
  },
}));

export default useChatStore;
