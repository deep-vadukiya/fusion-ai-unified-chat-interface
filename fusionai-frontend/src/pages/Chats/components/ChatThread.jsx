//

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useChatStore from "../../../store/chat.store";
//
import Markdown from "../../../components/Markdown";

// ------------------------------------------------

export default function ChatThread() {
  const { chat_id } = useParams();

  const { currentChat, thread, isLoading, getChatThread } = useChatStore();

  useEffect(() => {
    if (chat_id) getChatThread(chat_id);
  }, [chat_id]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  console.log(thread);

  return (
    <div>
      <h4>ChatThread</h4>

      <h5>{currentChat?.title ?? ""}</h5>

      <br />
      <br />
      <br />

      {thread?.map((message) => (
        <div key={message.id}>
          <b>{message.role}</b>

          <Markdown>{message.content}</Markdown>
        </div>
      ))}
    </div>
  );
}
