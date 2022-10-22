import urlMetadata from "url-metadata"
import { getPosts, setPost } from "../repositories/posts.repositories.js"
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


const insertPost = async (req, res) => {
    const { link, description } = req.body
    const { userId } = res.locals.user

    try {
        const metadata = await urlMetadata(link)
        setPost({ userId, link, description, metadata })
        res.sendStatus(STATUS.CREATED)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

export { listPosts, insertPost }