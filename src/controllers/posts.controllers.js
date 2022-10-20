import urlMetadata from "url-metadata"
import { getPosts } from "../repositories/posts.repositories.js"
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
    const metadata = await urlMetadata(link)
    console.log({
        title: metadata.title, 
        description: metadata.description, 
        url: metadata.url, 
        image: metadata.image
    })
    
    res.send(metadata)
}

export { listPosts, insertPost }