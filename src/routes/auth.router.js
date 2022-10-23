import { Router } from "express";

import * as middleware from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", middleware.verifyNewUser, controller.register);
router.post("/login", middleware.verifyUser, controller.login);
router.patch("/logout", middleware.verifyRefreshToken, controller.logout);
router.get("/new-token", middleware.verifyRefreshToken, controller.sendNewToken);

// connection test route
router.get("/connection", middleware.verifyConnection, (_, res) => res.sendStatus(200));


export default router;