//

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import generatePrompt from "../../../utils/promptGenerator";

// ------------------------------------------------

export default function index() {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");

  const navigateToChat = (chatId) => {
    navigate(`/chat/thread/${chatId}`);
  };

  const sendRequest = () => {
    const data = { prompt };
    generatePrompt(data, navigateToChat);
  };

  return (
    <div>
      <p>prompt section</p>

      <br />
      <br />
      <br />

      <div>
        <input
          placeholder="Ask Anything ..."
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
        <button onClick={sendRequest}>Send</button>
      </div>
    </div>
  );
}
