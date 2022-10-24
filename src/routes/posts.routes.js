import { Router } from "express";
import { insertPost, listPosts } from "../controllers/posts.controllers.js";
import { verifyConnection } from "../middlewares/auth.middleware.js"
import { verifyPost } from "../middlewares/posts.middlewares.js";

const router = Router()

router.get('/timeline', listPosts)
router.post('/post', verifyConnection, verifyPost, insertPost)

export default router