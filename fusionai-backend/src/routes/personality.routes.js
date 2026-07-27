//

import { Router } from "express";
import * as PersonalityController from "../controllers/PersonalityController.js";

// ----------------------------------------------

const router = Router();

router.post("/", PersonalityController.createPersonality);

export default router;
