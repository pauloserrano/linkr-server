import express from "express";
import { UserPosts } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/user/:id", UserPosts)

export default router