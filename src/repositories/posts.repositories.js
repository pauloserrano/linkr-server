import connection from "../database/db.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"

const { USERS, POSTS, COMMENTS } = FIELDS

const getPost = ({ id }) => {
    return connection.query(`
        SELECT * FROM ${TABLES.POSTS} 
        WHERE ${POSTS.ID} = $1;
    `, [id])
}

const getPosts = (offset=0, limit=20) => {
    return connection.query(`
        SELECT 
            ${TABLES.POSTS}.${POSTS.ID}, 
            ${TABLES.POSTS}.${POSTS.USER_ID},
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


const setPost = ({ userId, link, body, metadata: { title, source, description, image } }) => {
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
    `, [link, body, userId, title || source, description, image])
}


const deletePost = ({ id }) => {
    return connection.query(`
        DELETE FROM ${TABLES.POSTS}
        WHERE ${POSTS.ID} = $1;
    `, [id])
}

const updatePost = ({ id, body }) => {
    return connection.query(`
        UPDATE ${TABLES.POSTS}
        SET ${POSTS.BODY} = $1
        WHERE ${POSTS.ID} = $2;
    `, [body, id])
}

const getComments = ({ id }) => {
    return connection.query(`
        SELECT 
            ${TABLES.USERS}.${USERS.PICTURE_URL},
            ${TABLES.USERS}.${USERS.NAME},
            ${TABLES.COMMENTS}.${COMMENTS.BODY}
        FROM ${TABLES.COMMENTS} 
        JOIN ${TABLES.USERS} ON ${TABLES.USERS}.${USERS.ID} = ${TABLES.COMMENTS}.${COMMENTS.USER_ID}
        WHERE ${TABLES.COMMENTS}.${COMMENTS.POST_ID} = $1;
    `, [id])
}

const setComment = ({ id, userId, body }) => {
    return connection.query(`
        INSERT INTO ${TABLES.COMMENTS} 
        (
            ${COMMENTS.USER_ID},
            ${COMMENTS.POST_ID},
            ${COMMENTS.BODY}
        )
        VALUES ($1, $2, $3);
    `, [userId, id, body])
}

export { getPost, getPosts, setPost, deletePost, updatePost, getComments, setComment }