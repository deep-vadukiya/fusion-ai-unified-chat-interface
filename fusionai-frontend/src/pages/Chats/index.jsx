//

import { Outlet } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

// ------------------------------------------------

const chatList = [
  {
    id: 1,
    title: "Chat 1",
  },
  {
    id: 2,
    title: "Chat 2",
  },
  {
    id: 3,
    title:
      "Chat 3 lorem impsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    title:
      "Chat 4 lorem impsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    title:
      "Chat 5 lorem impsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 1,
    title:
      "Chat 6 lorem impsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    title: "Chat 2",
  },
  {
    id: 3,
    title: "Chat 3",
  },
  {
    id: 4,
    title: "Chat 4",
  },
  {
    id: 5,
    title: "Chat 5",
  },
  {
    id: 1,
    title: "Chat 1",
  },
  {
    id: 2,
    title: "Chat 2",
  },
  {
    id: 3,
    title: "Chat 3",
  },
  {
    id: 4,
    title: "Chat 4",
  },
  {
    id: 5,
    title: "Chat 5",
  },
  {
    id: 1,
    title: "Chat 1",
  },
  {
    id: 2,
    title: "Chat 2",
  },
  {
    id: 3,
    title: "Chat 3",
  },
  {
    id: 4,
    title: "Chat 4",
  },
  {
    id: 5,
    title: "Chat 5",
  },
  {
    id: 5,
    title: "Chat 5 lorem impsum dolor sit amet.",
  },
  {
    id: 1,
    title: "Chat 6 lorem impsum dolor ",
  },
  {
    id: 5,
    title: "Chat 5 lorem impsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 1,
    title: "Chat 6 lorem impsum.",
  },
];

export default function index() {
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
          <ChatsList chatList={chatList} />
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
  //

  return (
    <List dense={true}>
      {chatList.map((chat, i) => (
        <ListItem
          key={`chat-list-${i}`}
          disablePadding
        >
          <ListItemButton
            component="a"
            href={`/chat/thread/${i}`}
            sx={{
              color: "black",
              textDecoration: "none",
              borderRadius: 2,
              gap: 1,
              padding: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ListItemText
              primary={chat.title}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="body2">D</Typography>
              <Typography variant="body2">H</Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
