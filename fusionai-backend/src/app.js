//

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";

// ----------------------------------------------

const app = express();

app.use(cors({ cors: "*" }));

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  req.request_time = new Date().toISOString();
  next();
});

app.use(express.urlencoded({ extended: true }));

// api entry point ...
app.use("/api/v1", routes);

// api status: 404 ...
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
