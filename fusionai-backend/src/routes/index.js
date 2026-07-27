//

import { Router } from "express";
import healthRoutes from "./health.routes.js";
import chatRoutes from "./chat.routes.js";

// ----------------------------------------------

const routes = Router();

routes.use("/health", healthRoutes);

routes.use("/prompts", chatRoutes);

export default routes;
