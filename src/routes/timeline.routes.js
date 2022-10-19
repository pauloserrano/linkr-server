import { Router } from "express";
import { listPosts } from "../controllers/timeline.controllers.js";

const router = Router()

router.get('/timeline', listPosts)

export default router