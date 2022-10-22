import { STATUS } from "../enums/status.js"
import postSchema from "../schemas/post.schema.js"

const verifyPost = (req, res, next) => {
    const { link, description } = req.body
    const isValid = postSchema.validate({ link, description }, { abortEarly: false })

    if (isValid.error){
        res.status(STATUS.UNPROCESSABLE_ENTITY).send(isValid.error.details.map(({ message }) => message))
        return
    }

    next()
}

export { verifyPost }