import express from "express";
import { likeAmount, insertLike, removeLike } from "../controllers/like.controller.js";

const router = express.Router()

router.get("/likeamount/:postId", likeAmount)
router.post("/like/:postId", insertLike)
router.delete("/like/:postId", removeLike)

export default router