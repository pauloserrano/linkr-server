import express from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/search.controller.js";
const router = express.Router();

router.get("/users", authMiddleware.verifyConnection, controller.searchUsers);

export default router;