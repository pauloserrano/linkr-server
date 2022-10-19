import connection from "../database/db.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"

const { USERS, POSTS } = FIELDS

const getPosts = (limit=20) => {
    return connection.query(`
        SELECT 
            ${POSTS.ID}, ${USERS.NAME}, ${USERS.PICTURE_URL}, ${POSTS.LINK}, ${POSTS.DESCRIPTION} 
        FROM ${TABLES.POSTS} 
        JOIN ${TABLES.USERS} ON ${USERS.ID}=${POSTS.USER_ID}
        ORDER BY ${POSTS.CREATED_AT} DESC
        LIMIT ${limit};
    `)
}

export { getPosts }