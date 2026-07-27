//

import { Router } from "express";
import ChatController from "../controllers/ChatController.js";

// ----------------------------------------------

const router = Router();

router.post("/", ChatController.createPrompt);

export default router;
