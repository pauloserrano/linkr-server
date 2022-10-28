import { STATUS } from "../enums/status.js"
import postSchema from "../schemas/post.schema.js"
import { getPost } from "../repositories/posts.repositories.js"

const validatePost = (req, res, next) => {
    const { link, description } = req.body
    const isValid = postSchema.validate({ link, description }, { abortEarly: false })

    if (isValid.error){
        res.status(STATUS.UNPROCESSABLE_ENTITY).send(isValid.error.details.map(({ message }) => message))
        return
    }

    next()
}

const verifyPost = async (req, res, next) => {
    const { id } = req.params

    try {
        const { rows: [ post ] } = await getPost({ id })
        
        if (!post){
            res.sendStatus(STATUS.NOT_FOUND)
            return
        }

        res.locals.post = post
        next()

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS.SERVER_ERROR)
    }
}

export { validatePost, verifyPost }