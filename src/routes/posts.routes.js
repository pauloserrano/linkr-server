import { Router } from "express";
import { insertPost, listPosts, removePost } from "../controllers/posts.controllers.js";
import { verifyConnection, verifyUser } from "../middlewares/auth.middleware.js"
import { verifyPost } from "../middlewares/posts.middlewares.js";

const router = Router()

router.get('/timeline', listPosts)
router.post('/post', verifyConnection, verifyPost, insertPost)
router.delete('/post/:id', verifyConnection, removePost)

export default router