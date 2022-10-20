import { Router } from "express";

import * as middleware from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", middleware.verifyNewUser, controller.register);
router.post("/login", middleware.verifyUser, controller.login);

export default router;