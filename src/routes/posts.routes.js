import { Router } from "express";
import { insertPost, listPosts, removePost, modifyPost, insertComment, listComments, repostPost } from "../controllers/posts.controllers.js";
import { verifyConnection } from "../middlewares/auth.middleware.js"
import { validatePost } from "../middlewares/posts.middlewares.js";

const router = Router()

router.get('/timeline', listPosts)
router.post('/post', verifyConnection, validatePost, insertPost)
router.delete('/post/:id', verifyConnection, removePost)
router.patch('/post/:id', verifyConnection, modifyPost)
router.get('/post/:id/comments', verifyConnection, listComments)
router.post('/post/:id/comment', verifyConnection, insertComment)
router.post('/repost/:id', verifyConnection, repostPost)

export default router