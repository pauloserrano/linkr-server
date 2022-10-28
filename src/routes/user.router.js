import express from "express";
import { UserPosts, GetAllUsers} from "../controllers/user.controller.js";
import { verifyConnection } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/user/:id", UserPosts)
router.get("/users/all", verifyConnection, GetAllUsers)

export default router