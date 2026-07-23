//

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// ----------------------------------------------

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  // log user requests to the console ...
  console.log("➡️ ➡️", req.method, " :", req.url);
  next();
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FusionAI Backend is running",
    timestamp: new Date().toISOString(),
  });
});

export default app;
