//

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
// @zustand ...
import useChatStore from "../../store/chat.store";

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
          <ChatsList chatList={chatsList} />
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
const ChatsList = ({ chatList }) => {
  return (
    <List dense={true}>
      {chatList.map((chat, i) => (
        <ListItem
          key={`chat-list-${i}`}
          disablePadding
        >
          <ListItemButton
            component="a"
            href={`/chat/thread/${chat?._id}`}
            sx={{
              color: "black",
              textDecoration: "none",
              borderRadius: 2,
              gap: 1,
              padding: 1,
              display: "flex",
              justifyContent: "space-between",
              "& .actions": {
                opacity: 0,
                transition: "opacity 0.2s ease",
              },

              "&:hover .actions": {
                opacity: 1,
              },
            }}
          >
            <ListItemText
              primary={chat?.title ?? "Untitled Chat"}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />

            <Box
              className="actions"
              sx={{ display: "flex", gap: 0.5 }}
            >
              <IconButton
                size="small"
                disableRipple={true}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                disableRipple={true}
              >
                <MoreHorizOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
