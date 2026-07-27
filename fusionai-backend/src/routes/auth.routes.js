//

import { Router } from "express";
import * as authController from "../controllers/authController.js";

// ----------------------------------------------

const router = Router();

router.post("/sign-up", authController.singUp);
router.post("/sign-in", authController.signIn);

export default router;
