//

import { Router } from "express";
// import ChatController from "../controllers/ChatController.js"; // prompt controller
import { generate, getThreads } from "../controllers/ChatController.js";

// ----------------------------------------------

const router = Router();

router.post("/", generate);
router.get("/:chat_id", getThreads);

export default router;
