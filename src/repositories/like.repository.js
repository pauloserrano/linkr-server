import connection from "../database/db.js"

async function formatWhoLike({postId, isLiked}) {

    let whoLike = await connection.query(
        //console.log(postId)
        `
        SELECT users.name FROM likes
        JOIN users ON likes."userId" = users.id
        WHERE likes."postId"=$1
        LIMIT 3
        `
    ,[postId])

    whoLike = whoLike.rows.map(e=>e.name)
    
    return whoLike
}

export { formatWhoLike }