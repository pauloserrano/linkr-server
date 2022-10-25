import connection from "../database/db.js";

async function likeAmount (req, res){

    const postId = req.params?.postId

    try {

        let likeAmount = await connection.query(`
        SELECT COUNT(*) AS "likeAmount" 
        FROM likes
        WHERE "postId"=$1
        GROUP BY "postId"`
        , [postId])

        if (likeAmount?.rows[0]?.likeAmount){likeAmount = likeAmount.rows[0].likeAmount}
        else {likeAmount = 0}

        let isLiked = await connection.query(`SELECT * FROM likes WHERE "postId"=$1 AND "userId"=$2`,[postId, 1])

        if (isLiked?.rows[0]) {isLiked = true} 
        else {isLiked = false}
    
        res.send({likeAmount, isLiked})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    
}
async function insertLike (req, res){

    const postId = req.params?.postId

    try {   
        
        await connection.query(`INSERT INTO likes ("postId", "userId") VALUES ($1, $2)`, [postId, 1])

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
async function removeLike (req, res){

    const postId = req.params?.postId

    try {   
        
        await connection.query(`DELETE FROM likes WHERE "postId"=$1 AND "userId"=$2`, [postId, 1])

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export {likeAmount, insertLike, removeLike}