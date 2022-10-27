import connection from "../database/db.js"

async function setHashtagArray({body, userId}){

    console.log(body)

    const postId = await connection.query(`SELECT * FROM posts WHERE "userId"=$1 ORDER BY id DESC;`, [userId])
    const hashtagArray = body.split(" ").filter(e => e.includes("#") && e[0] === "#").map(e => e.replace('#', ''))

    hashtagArray.map(e => setHashtag({hashtagName:e, postId: postId.rows[0].id}))

}

async function setHashtag ({hashtagName, postId}) {

    const hasHashtag = await connection.query(`SELECT * FROM hashtags WHERE name=$1`, [hashtagName])

    if (!hasHashtag.rows[0]){

        await connection.query(`INSERT INTO hashtags (name) VALUES ($1)`, [hashtagName])

    } else {

        console.log(`hashtag ja cadastrada (${hashtagName})`)
    }

    return setPostsHashtag({hashtagName, postId})
}

async function setPostsHashtag({hashtagName, postId}) {

    const hashtagId = await connection.query(`SELECT * FROM hashtags WHERE name=$1`, [hashtagName])

    const verifyPostsHashtags = await connection.query(`SELECT * FROM "postsHashtags" WHERE "postId"=$1 AND "hashtagId"=$2`, [postId, hashtagId.rows[0].id])

    if (!verifyPostsHashtags.rows[0]){
        await connection.query(`INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES ($1, $2)`, [postId, hashtagId.rows[0].id])
    }
    
    return 
}

export { setHashtagArray }