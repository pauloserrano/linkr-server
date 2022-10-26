import { Router } from "express";
import { insertPost, listPosts, removePost, modifyPost, insertComment, listComments } from "../controllers/posts.controllers.js";
import { verifyConnection, verifyUser } from "../middlewares/auth.middleware.js"
import { verifyPost } from "../middlewares/posts.middlewares.js";

const router = Router()

router.get('/timeline', listPosts)
router.post('/post', verifyConnection, verifyPost, insertPost)
router.delete('/post/:id', verifyConnection, removePost)
router.patch('/post/:id', verifyConnection, modifyPost)
router.get('/post/:id/comments', verifyConnection, listComments)
router.post('/post/:id/comment', verifyConnection, insertComment)

export default router