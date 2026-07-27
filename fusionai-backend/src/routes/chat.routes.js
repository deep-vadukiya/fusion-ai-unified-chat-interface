//

import { Router } from "express";
// import ChatController from "../controllers/ChatController.js"; // prompt controller
import { generate } from "../controllers/ChatController.js";

// ----------------------------------------------

const router = Router();

router.post("/", generate);

export default router;
