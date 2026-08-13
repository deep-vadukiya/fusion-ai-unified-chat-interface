//

import axios from "../utils/axios";
import { HOST_API } from "../config";
import useChatStore from "../store/chat.store";

// ------------------------------------------------

// testing variables
const personalityId = "6a67820e972e853e63641549";

// generate new prompt with stream ...
export const generatePrompt = async (data, navigateToChat) => {
  const { prompt } = data;

  const {
    setSession,
    addAssistantMessage,
    appendToken,
    startStreaming,
    finishStreaming,
    addUserMessage,
    startThinking,
    stopThinking,
  } = useChatStore.getState();

  const accessToken = window.localStorage.getItem("accessToken");

  if (prompt.trim().length) {
    addUserMessage(prompt);
    startStreaming();
    startThinking();

    const response = await fetch(HOST_API + "/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },

      body: JSON.stringify({
        chat_id: data?.chatId,

        message: prompt,

        personality_id: personalityId,

        provider: "openai",

        model: "gpt-5.5",
      }),
    });

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, {
        stream: true,
      });

      const events = buffer.split("\n\n");

      buffer = events.pop();

      for (const event of events) {
        const lines = event.split("\n");

        const eventName = lines[0].replace("event: ", "");

        const eventData = JSON.parse(lines[1].replace("data: ", ""));

        switch (eventName) {
          case "session":
            setSession(eventData);
            addAssistantMessage(eventData.execution_id);
            if (!data?.chat_id && eventData?.chat_id)
              navigateToChat(eventData?.chat_id);
            break;

          case "token":
            stopThinking();
            appendToken(eventData.execution_id, eventData.content);
            break;

          case "done":
            console.log("Completed");
            finishStreaming();
            break;

          case "error":
            console.error(eventData.message);
            finishStreaming();
            break;
        }
      }
    }
  }
};

export const getChatsList = async () => {
  const { data } = await axios.get(`chat`);

  return data;
};

// get thread with chat_id ...
export const getThread = async (chatId) => {
  const { data } = await axios.get(`chat/${chatId}`);

  return data;
};
