//

import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// @mui
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
// store ...
import useChatStore from "../../../store/chat.store";
// components ...
import PromptComponent from "./PromptComponent";
import Markdown from "../../../components/Markdown";

// ------------------------------------------------

export default function ChatThread() {
  const { chat_id } = useParams();

  const { thread, isLoading, getChatThread, isStreaming, isThinking } =
    useChatStore();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chat_id) return;
    if (isStreaming) return;
    getChatThread(chat_id);
  }, [chat_id]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      150;

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({
        behavior: "auto",
      });
    }
  }, [thread]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <Box
      sx={{
        height: "98vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: "100%",
          flex: 1,
          overflowY: "auto",
          minHeight: 0,
          justifyContent: "center",
        }}
      >
        <Container
          sx={{
            px: 2,
            py: 3,
            mx: 5,
          }}
          maxWidth="md"
        >
          <Stack
            direction="column"
            spacing={2}
            ref={containerRef}
          >
            {thread?.map((message, i) => (
              <Box key={`message-thread-${i}`}>
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
                    <Markdown>{message.content}</Markdown>
                  </Stack>
                ) : null}
              </Box>
            ))}

            {isThinking ? (
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <CircularProgress
                  enableTrackSlot
                  size="24px"
                  aria-label="Thinking …"
                />
                <Typography
                  variant="caption"
                  color="textDisabled"
                >
                  Thinking ...{" "}
                </Typography>
              </Stack>
            ) : null}

            <Box ref={bottomRef} />
          </Stack>
        </Container>
      </Stack>

      <Box
        sx={{
          width: "100%",
          pb: 2,
          pt: 1,
          backgroundColor: "transparent",
        }}
      >
        <PromptComponent />
      </Box>
    </Box>
  );
}
