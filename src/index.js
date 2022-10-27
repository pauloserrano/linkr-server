import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import hashtagRoute from "./routes/hashtag.route.js"
import timelineRoutes from "./routes/posts.routes.js"
import authRouter from "./routes/auth.router.js"
<<<<<<< HEAD
import searchRouter from "./routes/search.router.js"
=======
import likeRoute from "./routes/likes.router.js"
import userRoute from "./routes/user.router.js"
import followsRoute from "./routes/follows.router.js"
>>>>>>> main

dotenv.config()

const app = express()
app.use(cors(), json())
app.use(authRouter)
app.use(timelineRoutes)
<<<<<<< HEAD
app.use(searchRouter)
=======
app.use(likeRoute)
app.use(userRoute)
app.use(followsRoute)
>>>>>>> main

app.get('/status', (req, res) => {
    res.send('OK')
})

app.use(hashtagRoute)

app.listen(process.env.PORT, () => `Server running on ${process.env.PORT}`)