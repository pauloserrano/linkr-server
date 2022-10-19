import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import timelineRoutes from "./routes/timeline.routes.js"
dotenv.config()

const app = express()
app.use(cors(), json())
app.use(timelineRoutes)

app.get('/status', (req, res) => {
    res.send('OK')
})

app.listen(process.env.PORT, () => `Server running on ${process.env.PORT}`)