//

import { Router } from "express";
import healthRoutes from "./health.routes.js";

import personalityRoutes from "./personality.routes.js";
import chatRoutes from "./chat.routes.js";

// ----------------------------------------------

const routes = Router();

routes.use("/health", healthRoutes);

routes.use("/personalities", personalityRoutes);

// routes.use("/prompts", chatRoutes);

routes.use("/chat", chatRoutes);

export default routes;
