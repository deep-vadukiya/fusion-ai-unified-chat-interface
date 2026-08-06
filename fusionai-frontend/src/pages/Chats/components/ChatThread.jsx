//

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useChatStore from "../../../store/chat.store";
//
import Markdown from "../../../components/Markdown";
import { Box, Container, Stack, Typography } from "@mui/material";

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

      <Container
        maxWidth="md"
        sx={{ padding: 2 }}
      >
        <Stack
          direction="column"
          spacing={2}
        >
          {thread?.map((message) => (
            <Box key={`message-thread-${message?.id}`}>
              {message?.role === "user" ? (
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ justifyContent: "flex-end" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor: "#ddddddd9",
                      padding: 1,
                      paddingInline: 2,
                      borderRadius: 3,
                    }}
                  >
                    {message?.content ?? ""}
                  </Typography>
                </Stack>
              ) : message.role === "assistant" ? (
                <Stack
                  spacing={2}
                  sx={{ marginBottom: 3 }}
                >
                  <Typography variant="body2">
                    <Markdown>{message.content}</Markdown>
                  </Typography>
                </Stack>
              ) : null}
            </Box>
          ))}
        </Stack>
      </Container>
    </div>
  );
}
