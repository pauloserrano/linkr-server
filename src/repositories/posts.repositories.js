import connection from "../database/db.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"

const { USERS, POSTS } = FIELDS

const getPosts = (limit=20) => {
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
        LIMIT ${limit};
    `)
}


const setPost = ({ userId, link, description, metadata }) => {

}

export { getPosts }