//

import { Router } from "express";
import healthRoutes from "./health.routes.js";

import verifyToken from "../utils/verifyToken.js";

import authRouter from "./auth.routes.js";
import personalityRoutes from "./personality.routes.js";
import chatRoutes from "./chat.routes.js";

// ----------------------------------------------

const routes = Router();

routes.use("/health", healthRoutes);

routes.use("/auth", authRouter);
routes.use("/", verifyToken, authRouter);
routes.use("/personalities", personalityRoutes);
routes.use("/chat", chatRoutes);

export default routes;
