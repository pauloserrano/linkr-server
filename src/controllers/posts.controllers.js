import urlMetadata from "url-metadata"
import { getPosts, setPost } from "../repositories/posts.repositories.js"
import { setHashtagArray } from "../repositories/hashtag.repository.js"
import { STATUS } from "../enums/status.js"

const listPosts = async (req, res) => {
    urlMetadata('https://trello.com/b/g2CSsUvs/linkr-sprint-1').then(console.log)
    try {
        const { rows: posts } = await getPosts()
        res.send(posts)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}


const insertPost = async (req, res) => {
    const { link, body } = req.body
    const { userId } = res.locals.tokenData

    try {
        const metadata = await urlMetadata(link)
        await setPost({ userId, link, body, metadata })
        await setHashtagArray({body, userId})
        res.sendStatus(STATUS.CREATED)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

export { listPosts, insertPost }