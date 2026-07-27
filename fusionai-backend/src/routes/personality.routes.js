//

import { Router } from "express";
import * as personalityController from "../controllers/PersonalityController.js";

// ----------------------------------------------

const router = Router();

router.post("/", personalityController.createPersonality);
router.put("/:id", personalityController.updatePersonality);
router
  .get("/", personalityController.getAllPersonalities)
  .get("/:id", personalityController.getPersonalityById);
router.delete("/:id", personalityController.deletePersonality);

export default router;
