import express from "express";
import { likeAmount, insertLike, removeLike, teste} from "../controllers/like.controller.js";

const router = express.Router()

router.get("/likeamount/:postId", likeAmount)
router.post("/like/:postId", insertLike)
router.delete("/like/:postId", removeLike)
router.get("/like/teste", teste)

export default router