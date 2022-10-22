import { Router } from "express";
import { insertPost, listPosts } from "../controllers/posts.controllers.js";
import { verifyConnection } from "../middlewares/auth.middleware.js"

const router = Router()

router.get('/timeline', listPosts)
router.post('/post', verifyConnection, insertPost)

export default router