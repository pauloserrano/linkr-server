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
            ${TABLES.POSTS}.${POSTS.BODY}, 
            ${TABLES.POSTS}.${POSTS.META_TITLE}, 
            ${TABLES.POSTS}.${POSTS.META_DESCRIPTION}, 
            ${TABLES.POSTS}.${POSTS.META_IMAGE}
        FROM ${TABLES.POSTS} 
        JOIN ${TABLES.USERS} ON ${TABLES.USERS}.${USERS.ID}=${TABLES.POSTS}.${POSTS.USER_ID}
        ORDER BY ${TABLES.POSTS}.${POSTS.CREATED_AT} DESC
        LIMIT $1
        OFFSET $2;
    `, [limit, offset])
}


const setPost = ({ userId, link, body, metadata }) => {
    return connection.query(`
        INSERT INTO ${TABLES.POSTS} 
        (   
            ${POSTS.LINK}, 
            ${POSTS.BODY}, 
            ${POSTS.USER_ID},
            ${POSTS.META_TITLE},
            ${POSTS.META_DESCRIPTION},
            ${POSTS.META_IMAGE}
        ) 
        VALUES ($1, $2, $3, $4, $5, $6)
    `, [link, body, userId, metadata.title || metadata.source, metadata.description, metadata.image])
}

export { getPosts, setPost }