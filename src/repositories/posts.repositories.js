import connection from "../database/db.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"

const { USERS, POSTS } = FIELDS

const getPosts = (offset=0, limit=20) => {
    return connection.query(`
        SELECT 
            ${TABLES.POSTS}.${POSTS.ID}, 
            ${TABLES.USERS}.${USERS.NAME}, 
            ${TABLES.USERS}.${USERS.PICTURE_URL}, 
            ${TABLES.POSTS}.${POSTS.LINK}, 
            ${TABLES.POSTS}.${POSTS.DESCRIPTION} 
        FROM ${TABLES.POSTS} 
        JOIN ${TABLES.USERS} ON ${TABLES.USERS}.${USERS.ID}=${TABLES.POSTS}.${POSTS.USER_ID}
        ORDER BY ${TABLES.POSTS}.${POSTS.CREATED_AT} DESC
        LIMIT $1
        OFFSET $2;
    `, [limit, offset])
}


const setPost = ({ userId, link, description, metadata }) => {
    // Post format suggestion
    console.log({
        userId,
        link,
        //body,
        title: metadata.title, 
        description: metadata.description,
        image: metadata.image
    })

    return connection.query(`
        INSERT INTO ${TABLES.POSTS} (${POSTS.LINK}, ${POSTS.DESCRIPTION}, ${POSTS.USER_ID}) VALUES ($1, $2, $3)
    `, [link, description, userId])
}

export { getPosts, setPost }