import urlMetadata from "url-metadata"
import { getPost, getPosts, setPost, deletePost, updatePost, getComments, setComment, insertRepost, deleteRepost, getRepost } from "../repositories/posts.repositories.js"
import { setHashtagArray } from "../repositories/hashtag.repository.js"
import { STATUS } from "../enums/status.js"

const listPosts = async (req, res) => {
    const { userId } = res.locals.tokenData

    try {
        const { rows: posts } = await getPosts({ userId })
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
        await setHashtagArray({ body, userId })

        res.sendStatus(STATUS.CREATED)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}


const removePost = async (req, res) => {
    const { id } = req.params
    const { userId } = res.locals.tokenData

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

        await Promise.all(deletePost({ id }))
        res.sendStatus(STATUS.OK)

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

const modifyPost = async (req, res) => {
    const { id } = req.params
    const { userId } = res.locals.tokenData
    const { body } = req.body
    
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

        await updatePost({ id, body })
        res.sendStatus(STATUS.OK)

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

const listComments = async (req, res) => {
    const { id } = req.params

    try {
        const { rows: comments } = await getComments({ id })
        res.send(comments)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

const insertComment = async (req, res) => {
    const { id } = req.params
    const { body } = req.body
    const { userId } = res.locals.tokenData

    try {
        const { rows: [ post ] } = await getPost({ id })

        if (!post){
            res.sendStatus(STATUS.NOT_FOUND)
            return
        }

        await setComment({ id, body, userId })
        res.sendStatus(STATUS.OK)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

const repostPost = async (req, res) => {
    const { id } = req.params
    const { userId } = res.locals.tokenData

    try {
        await insertRepost({ id, userId })
        res.send(STATUS.CREATED)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

const removeRepost = async (req, res) => {
    const { id } = req.params
    const { userId } = res.locals.tokenData

    try {
        const { rows: [ repost ] } = await getRepost({ id })

        if (!repost){
            res.sendStatus(STATUS.NOT_FOUND)
            return
        }

        if (repost.userId !== userId){
            res.sendStatus(STATUS.UNAUTHORIZED)
            return
        }
        await deleteRepost({ id })
        res.sendStatus(STATUS.OK)

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

export { listPosts, insertPost, removePost, modifyPost, listComments, insertComment, repostPost, removeRepost }