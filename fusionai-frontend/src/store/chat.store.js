//

import { create } from "zustand";
import { getThread, getChatsList } from "../actions/promptGenerator";

// ------------------------------------------------

const useChatStore = create((set) => ({
  currentChatId: null,
  currentPromptId: null,

  isStreaming: false,

  isThinking: false,

  // chats list ...
  chatsList: [],

  // threads ...
  isLoading: false,
  currentChat: null,
  thread: [],

  setSession: (session) =>
    set({
      currentChatId: session.chat_id,
      currentPromptId: session.prompt_id,
    }),

  addUserMessage: (content) =>
    set((state) => ({
      thread: [
        ...state.thread,
        {
          message_id: `temp-user-${Date.now()}`,
          role: "user",
          content,
        },
      ],
    })),

  addAssistantMessage: (execution_id) =>
    set((state) => ({
      thread: [
        ...state.thread,
        {
          execution_id,
          role: "assistant",
          content: "",
        },
      ],
    })),

  appendToken: (execution_id, token) =>
    set((state) => ({
      thread: state.thread.map((message) =>
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

  startStreaming: () => {
    set({ isStreaming: true });
  },

  startThinking: () => {
    set({ isThinking: true });
  },

  stopThinking: () => {
    set({ isThinking: false });
  },

  // thread ...

  isLoadingThread: () => {
    set({
      isLoading: true,
      thread: [],
    });
  },

  getChatsList: async () => {
    try {
      set({ isLoading: true });

      const { data } = await getChatsList();

      set({
        chatsList: data,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        isLoading: false,
      });
    }
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
