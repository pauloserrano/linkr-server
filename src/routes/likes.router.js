import express from "express";
import { likeAmount, insertLike, removeLike, teste} from "../controllers/like.controller.js";
import { verifyConnection } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/likeamount/:postId", verifyConnection, likeAmount)
router.post("/like/:postId", verifyConnection, insertLike)
router.delete("/like/:postId", verifyConnection, removeLike)
router.get("/like/teste", teste)

export default router