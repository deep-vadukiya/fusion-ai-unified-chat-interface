//

import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
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
          <List dense={true}>
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
          py: 1,
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
