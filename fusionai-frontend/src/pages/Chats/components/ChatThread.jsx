//

import useChatStore from "../../../store/chat.store";

// ------------------------------------------------

export default function ChatThread() {
  const messages = useChatStore((state) => state.messages);

  // console.log(messages);

  return (
    <div>
      <h4>ChatThread</h4>

      <br />
      <br />
      <br />

      <p>{messages[0]?.content}</p>
    </div>
  );
}
