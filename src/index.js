import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import hashtagRoute from "./routes/hashtag.route.js"
import timelineRoutes from "./routes/posts.routes.js"
import authRouter from "./routes/auth.router.js"
import likeRouter from "./routes/likes.router.js"
import userRouter from "./routes/user.router.js"
import followsRouter from "./routes/follows.router.js"
import searchRouter from "./routes/search.router.js"

dotenv.config()

const app = express()
app.use(cors(), json())
app.use(authRouter)
app.use(timelineRoutes)
app.use(likeRouter)
app.use(userRouter)
app.use(followsRouter)
app.use(searchRouter)

app.get('/status', (req, res) => {
    res.send('OK')
})

app.use(hashtagRoute)

app.listen(process.env.PORT, () => `Server running on ${process.env.PORT}`)