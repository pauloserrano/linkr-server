import express from "express";
import { followsById, followInsert } from "../controllers/follows.controller.js";
import { verifyConnection } from "../middlewares/auth.middleware.js"
import { followVerify } from "../middlewares/follows.middleware.js";

const router = express.Router()

router.get("/follows/:followedId", verifyConnection, followsById)
router.post("/follow",verifyConnection, followVerify ,followInsert)

export default router