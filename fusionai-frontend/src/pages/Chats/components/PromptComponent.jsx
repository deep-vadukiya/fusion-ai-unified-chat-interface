//

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// @mui ...
import { Box, TextField, Tooltip, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// @action ...
import { generatePrompt } from "../../../actions/promptGenerator";

// ------------------------------------------------

export default function PromptComponent() {
  const navigate = useNavigate();
  const params = useParams();

  const [prompt, setPrompt] = useState("");

  const navigateToChat = (chatId) => {
    navigate(`/chat/thread/${chatId}`);
  };

  const sendRequest = () => {
    const chatId = params?.chat_id || null;
    const data = { prompt, chatId };
    generatePrompt(data, navigateToChat);
    setPrompt("");
  };

  const handleKeyDown = (event) => {
    // Enter = send ...
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendRequest();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 768,
        mx: "auto",

        display: "flex",
        alignItems: "flex-end",

        border: "1px solid",
        borderColor: "divider",

        borderRadius: 4,

        backgroundColor: "background.paper",

        px: 1,
        py: 0.5,

        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",

        "&:focus-within": {
          borderColor: "text.secondary",
        },
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={8}
        variant="standard"
        placeholder="Message FusionAI ..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        slotProps={{
          disableUnderline: true,
        }}
        sx={{
          mx: 1,
          "& .MuiInputBase-root": {
            padding: 0,
            "&:before": {
              borderBottom: "none !important",
            },
            "&:after": {
              borderBottom: "none !important",
            },
          },
          "& textarea": {
            padding: "8px 0",
            lineHeight: 1.5,
            fontSize: "15px",
          },
        }}
      />

      <Tooltip title="Send message">
        <IconButton
          size="small"
          onClick={sendRequest}
          disabled={!prompt.trim()}
          sx={{
            mb: 0.25,

            width: 32,
            height: 32,

            borderRadius: "50%",

            backgroundColor: "text.primary",
            color: "background.paper",

            "&:hover": {
              backgroundColor: "text.secondary",
            },

            "&.Mui-disabled": {
              backgroundColor: "action.disabledBackground",
              color: "action.disabled",
            },
          }}
        >
          <ArrowUpwardIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
