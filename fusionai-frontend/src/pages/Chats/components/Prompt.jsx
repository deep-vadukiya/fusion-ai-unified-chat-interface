//

import { Stack, Typography, Box } from "@mui/material";
import PromptComponent from "./PromptComponent";

// ------------------------------------------------

export default function index() {
  return (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={3}
    >
      <Box>
        <Typography variant="body2">How Can I Help You Today ...?</Typography>
      </Box>

      <PromptComponent />
    </Stack>
  );
}
