import urlMetadata from "url-metadata"
import { getPost, getPosts, setPost, deletePost } from "../repositories/posts.repositories.js"
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
    const { userId } = res.locals.user

    try {
        const metadata = await urlMetadata(link)
        await setPost({ userId, link, body, metadata })
        res.sendStatus(STATUS.CREATED)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}


const removePost = async (req, res) => {
    const { id } = req.params
    const { userId } = res.locals.user

    try {
        const { rows: [ post ] } = await getPost({ id })

        if (!post){
            res.sendStatus(STATUS.NOT_FOUND)
            return
        }

        if (post.userId !== userId){
            res.sendStatus(STATUS.UNAUTHORIZED)
            return
        }

        await deletePost({ id })
        res.sendStatus(STATUS.OK)

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}


export { listPosts, insertPost, removePost }