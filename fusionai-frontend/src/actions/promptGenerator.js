//

import { axiosInstance as axios } from "../utils/axios";
import { HOST_API } from "../config";
import useChatStore from "../store/chat.store";

// ------------------------------------------------

// testing variables
const chatId = "6a69bb973ee4bda7d6085f30";
// const chatId = null;
const personalityId = "6a67820e972e853e63641549";

// generate new prompt with stream ...
export const generatePrompt = async (data, navigateToChat) => {
  const { prompt } = data;

  const { setSession, addAssistantMessage, appendToken } =
    useChatStore.getState();

  const accessToken = window.localStorage.getItem("accessToken");

  if (prompt.length) {
    const response = await fetch(HOST_API + "/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },

      body: JSON.stringify({
        chat_id: chatId,

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

        const data = JSON.parse(lines[1].replace("data: ", ""));

        switch (eventName) {
          case "session":
            setSession(data);
            addAssistantMessage(data.execution_id);
            navigateToChat(data?.chat_id);
            break;

          case "token":
            appendToken(data.execution_id, data.content);
            break;

          case "done":
            console.log("Completed");
            break;

          case "error":
            console.error(data.message);
            break;
        }
      }
    }
  }
};

// get thread with chat_id ...
export const getThread = async (chatId) => {
  const { data } = await axios.get(`chat/${chatId}`);

  return data;
};
