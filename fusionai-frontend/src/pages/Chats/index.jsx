//

import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
// @mui ...
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
// @zustand ...
import useChatStore from "../../store/chat.store";
// paths ...
import { APP_PATH } from "../../routes/paths";

// ------------------------------------------------

export default function index() {
  const { getChatsList, chatsList } = useChatStore();

  useEffect(() => {
    getChatsList();
  }, []);

  return (
    <Container
      disableGutters={true}
      maxWidth={false}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          size={2}
          sx={{
            borderRight: "1px solid #ccc",
            height: "100vh",
            overflowY: "auto",
            padding: 1,
          }}
        >
          <List dense={true}>
            <ListItem
              disablePadding
              sx={{ width: "100%" }}
            >
              <ListItemButton
                component={Link}
                to={APP_PATH.newChat}
                sx={{
                  width: "100%",
                  minWidth: 0,
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  display: "flex",
                  alignItems: "center",
                  "&:hover .chat-actions": {
                    opacity: 1,
                    pointerEvents: "auto",
                  },
                }}
                disableTouchRipple={true}
              >
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  sx={{
                    maxWidth: 20,
                    maxHeight: 20,
                    minWidth: 20,
                    minHeight: 20,
                  }}
                >
                  <NoteAddOutlinedIcon
                    fontSize="small"
                    sx={{ fontSize: 16 }}
                  />
                </IconButton>
                <ListItemText
                  primary="New Chat"
                  sx={{ m: 0 }}
                />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            <ListItem
              sx={{
                width: "100%",
                minWidth: 0,
                borderRadius: 2,
                px: 1.5,
                py: 1,
                pl: 1,
                // pb: 0,
              }}
            >
              <Typography
                variant="body2"
                color="textDisabled"
              >
                Chats
              </Typography>
            </ListItem>

            {chatsList.map((chat, i) => (
              <ChatsList
                chat={chat}
                key={`chat-list-${i}`}
              />
            ))}
          </List>
        </Grid>

        <Grid
          size={10}
          sx={{
            height: "100vh",
            overflowY: "auto",
            padding: 1,
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}

//
const ChatsList = ({ chat }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <ListItem
      disablePadding
      sx={{ width: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ListItemButton
        component={Link}
        to={`/chat/thread/${chat._id}`}
        sx={{
          width: "100%",
          minWidth: 0,
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          display: "flex",
          alignItems: "center",
          "&:hover .chat-actions": {
            opacity: 1,
            pointerEvents: "auto",
          },
        }}
        disableTouchRipple={true}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <ListItemText
            primary={chat.title}
            sx={{
              m: 0,
              "& .MuiListItemText-primary": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          />
        </Box>

        <Box
          className="chat-actions"
          sx={{
            flexShrink: 0,
            display: hovered ? "flex" : "none",
            alignItems: "center",
            gap: 0.25,
            opacity: 0,
            pointerEvents: "none",
            transition: "opacity 150ms ease",
          }}
        >
          <IconButton
            size="small"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              // delete action ...
            }}
            sx={{ maxWidth: 20, maxHeight: 20, minWidth: 20, minHeight: 20 }}
          >
            <DeleteOutlineOutlinedIcon
              fontSize="small"
              sx={{ fontSize: 16 }}
            />
          </IconButton>

          <IconButton
            size="small"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              // more action ...
            }}
            sx={{ maxWidth: 20, maxHeight: 20, minWidth: 20, minHeight: 20 }}
          >
            <MoreHorizOutlinedIcon
              fontSize="small"
              sx={{ fontSize: 16 }}
            />
          </IconButton>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};
