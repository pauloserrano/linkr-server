import { getPosts } from "../repositories/timeline.repositories.js"
import { STATUS } from "../enums/status.js"

const listPosts = async (req, res) => {
    try {
        const { rows: posts } = await getPosts()
        res.send(posts)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

export { listPosts }