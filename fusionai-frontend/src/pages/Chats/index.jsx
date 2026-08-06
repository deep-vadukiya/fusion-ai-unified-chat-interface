//

import { Outlet } from "react-router-dom";
import { Container, Grid } from "@mui/material";

// ------------------------------------------------

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
            maxHeight: "100vh",
            overflowY: "auto",
            padding: 1,
          }}
        >
          <ChatsList />
        </Grid>

        <Grid
          size={10}
          sx={{
            borderRight: "1px solid #ccc",
            maxHeight: "100vh",
            overflowY: "auto",
            padding: 1,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}

//
const ChatsList = () => {
  //

  return <p>Chats section ....</p>;
};
