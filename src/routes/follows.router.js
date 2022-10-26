import express from "express";
import { followsById, followInsert, allFollows, followRemove} from "../controllers/follows.controller.js";
import { verifyConnection } from "../middlewares/auth.middleware.js"
import { followVerify } from "../middlewares/follows.middleware.js";

const router = express.Router()

router.get("/follows/all", verifyConnection, allFollows)
router.get("/follows/:followedId", verifyConnection, followsById)//verifica se o usuario logado segue a pessoa (retorna true ou false)
router.post("/follow",verifyConnection, followVerify ,followInsert)
router.delete("/follow/:followedId",verifyConnection, followRemove)

export default router