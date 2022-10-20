import { Router } from "express";
import { insertPost, listPosts } from "../controllers/posts.controllers.js";

const router = Router()

router.get('/timeline', listPosts)
router.post('/post', insertPost)

export default router