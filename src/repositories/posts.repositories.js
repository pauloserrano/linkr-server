import connection from "../database/db.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"

const { USERS, POSTS, COMMENTS, LIKES, POSTS_HASHTAGS, SHARED, FOLLOWS } = FIELDS

const getPost = ({ id }) => {
    return connection.query(`
        SELECT * FROM ${TABLES.POSTS} 
        WHERE ${POSTS.ID} = $1;
    `, [id])
}


const getRepost = ({ id }) => {
    return connection.query(`
        SELECT * FROM ${TABLES.SHARED} 
        WHERE ${SHARED.ID} = $1;
    `, [id])
}

const getPosts = ({ userId, offset, limit }) => {
    return connection.query(`
        SELECT 
            ${POSTS.ID},
            ${POSTS.USER_ID},
            ${POSTS.LINK}, 
            ${POSTS.BODY},
            ${POSTS.META_TITLE}, 
            ${POSTS.META_DESCRIPTION},
            ${POSTS.META_IMAGE},   
            ${USERS.NAME},
            ${USERS.PICTURE_URL},
            "repostId",
            "reposts",
            "isRepost"
        FROM (
            SELECT 
                ${TABLES.POSTS}.${POSTS.ID}, 
                ${TABLES.POSTS}.${POSTS.USER_ID},
                ${TABLES.USERS}.${USERS.NAME}, 
                ${TABLES.USERS}.${USERS.PICTURE_URL}, 
                ${TABLES.POSTS}.${POSTS.LINK}, 
                ${TABLES.POSTS}.${POSTS.BODY}, 
                ${TABLES.POSTS}.${POSTS.META_TITLE}, 
                ${TABLES.POSTS}.${POSTS.META_DESCRIPTION}, 
                ${TABLES.POSTS}.${POSTS.META_IMAGE},
                ${TABLES.POSTS}.${POSTS.CREATED_AT} AS timestamp,
                (SELECT COUNT(${TABLES.SHARED}.${SHARED.POST_ID}) FROM ${TABLES.SHARED} 
                WHERE ${TABLES.SHARED}.${SHARED.POST_ID} = ${TABLES.POSTS}.${POSTS.ID}) AS reposts,
                CASE WHEN TRUE THEN 0 END AS "repostId",
                CASE WHEN TRUE THEN FALSE END AS "isRepost"
            FROM ${TABLES.POSTS} 
            JOIN ${TABLES.USERS} ON ${TABLES.USERS}.${USERS.ID} = ${TABLES.POSTS}.${POSTS.USER_ID}
            JOIN ${TABLES.FOLLOWS} ON ${TABLES.FOLLOWS}.${FOLLOWS.FOLLOWED_ID} = ${TABLES.POSTS}.${POSTS.USER_ID}-- OR posts."userId" = $1
            WHERE ${TABLES.FOLLOWS}.${FOLLOWS.USER_ID} = $1
        UNION
            SELECT 
                ${TABLES.POSTS}.${POSTS.ID}, 
                ${TABLES.SHARED}.${POSTS.USER_ID},
                ${TABLES.USERS}.${USERS.NAME}, 
                ${TABLES.USERS}.${USERS.PICTURE_URL}, 
                ${TABLES.POSTS}.${POSTS.LINK}, 
                ${TABLES.POSTS}.${POSTS.BODY}, 
                ${TABLES.POSTS}.${POSTS.META_TITLE}, 
                ${TABLES.POSTS}.${POSTS.META_DESCRIPTION}, 
                ${TABLES.POSTS}.${POSTS.META_IMAGE},
                ${TABLES.SHARED}.${SHARED.CREATED_AT} AS timestamp,
                (SELECT COUNT(${TABLES.SHARED}.${SHARED.POST_ID}) FROM ${TABLES.SHARED} 
                WHERE ${TABLES.SHARED}.${SHARED.POST_ID} = ${TABLES.POSTS}.${POSTS.ID}) AS reposts,
                CASE WHEN TRUE THEN ${TABLES.SHARED}.${SHARED.ID} END AS "repostId",
                CASE WHEN TRUE THEN TRUE END AS "isRepost"
            FROM ${TABLES.SHARED}
            JOIN ${TABLES.USERS} ON ${TABLES.USERS}.${USERS.ID} = ${TABLES.SHARED}.${SHARED.USER_ID}
            JOIN ${TABLES.POSTS} ON ${TABLES.POSTS}.${POSTS.ID} = ${TABLES.SHARED}.${SHARED.POST_ID}
            JOIN ${TABLES.FOLLOWS} ON ${TABLES.FOLLOWS}.${FOLLOWS.FOLLOWED_ID} = ${TABLES.POSTS}.${POSTS.USER_ID}-- OR posts."userId" = $1
            WHERE ${TABLES.FOLLOWS}.${FOLLOWS.USER_ID} = $1
        ) AS timeline 
        ORDER BY timeline.timestamp DESC
        LIMIT $2
        OFFSET $3;
    `, [userId, limit || 20, offset || 0])
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

const deleteLikes = ({ id }) => {
    return connection.query(`   
        DELETE FROM ${TABLES.LIKES}
        WHERE ${LIKES.POST_ID} = $1;
    `, id)
}


const deletePost = ({ id }) => {
    return [
        connection.query(`
            DELETE FROM ${TABLES.LIKES}
            WHERE ${LIKES.POST_ID} = $1;
        `, [id]),
        
        connection.query(`
            DELETE FROM ${TABLES.POSTS_HASHTAGS}
            WHERE ${POSTS_HASHTAGS.POST_ID} = $1;
        `, [id]),

        connection.query(`
            DELETE FROM ${TABLES.COMMENTS}
            WHERE ${COMMENTS.POST_ID} = $1;
        `, [id]),

        connection.query(`
            DELETE FROM ${TABLES.SHARED}
            WHERE ${SHARED.POST_ID} = $1;
        `, [id]),

        connection.query(`
            DELETE FROM ${TABLES.POSTS}
            WHERE ${POSTS.ID} = $1;
        `, [id]),
    ]
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
        WHERE ${TABLES.COMMENTS}.${COMMENTS.POST_ID} = $1
        ORDER BY ${TABLES.COMMENTS}.${COMMENTS.CREATED_AT} DESC;
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

const insertRepost = ({ id, userId }) => {
    return connection.query(`
        INSERT INTO ${TABLES.SHARED}
        (
            ${SHARED.POST_ID},
            ${SHARED.USER_ID}
        )
        VALUES ($1, $2);
    `,[id, userId])
}

const deleteRepost = ({ id }) => {
    return connection.query(`
        DELETE FROM ${TABLES.SHARED} WHERE ${SHARED.ID} = $1;
    `, [id])
}

export { 
    getPost, 
    getPosts, 
    setPost, 
    deletePost, 
    updatePost, 
    getComments, 
    setComment, 
    insertRepost, 
    deleteRepost,
    getRepost
}