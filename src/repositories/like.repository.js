import connection from "../database/db.js"

async function formatWhoLike({postId, isLiked, userId}) {

    let whoLike = await connection.query(
        //console.log(postId)
        `
        SELECT users.name FROM likes
        JOIN users ON likes."userId" = users.id
        WHERE likes."postId"=$1 AND likes."userId"!=$2
        `
    ,[postId, userId])

    whoLike = whoLike.rows.map(e=>e.name)

    if (isLiked){
        whoLike.push("Você")
    }

    whoLike = whoLike.reverse()

    if (whoLike.length > 3){
        return [`${whoLike[0]}, ${whoLike[1]} e Outras ${whoLike.length-2} pessoas`]
    }
    if (whoLike.length === 3){
        return [`${whoLike[0]}, ${whoLike[1]} e ${whoLike[2]}`]
    }
    if (whoLike.length === 2){
        return [`${whoLike[0]} e ${whoLike[1]}`]
    }
    if (whoLike.length === 1){
        return [`${whoLike[0]}`]
    }
    if (whoLike.length === 0){
        return [`Seja o primeiro a curtir esse Post`]
    }
    
}

export { formatWhoLike }