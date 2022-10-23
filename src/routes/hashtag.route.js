import express from "express";
import { rankingHashtags , rankingTeste} from "../controllers/hashtag.controller.js";
import { headersHashtagMiddleware } from "../middlewares/hashtag.middlerare.js";

const router = express.Router()

router.get("/ranking/hashtag", headersHashtagMiddleware, rankingHashtags)
router.get("/ranking/hashtag/testes", rankingTeste)
//router.get("/search/hashtag/:hashtag", {} )

export default router