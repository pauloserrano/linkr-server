import connection from "../database/db.js";
import {formatWhoLike} from "../repositories/like.repository.js"

async function likeAmount (req, res){

    const postId = req.params?.postId
    const { userId } = res.locals.tokenData

    try {

        let likeAmount = await connection.query(`
        SELECT COUNT(*) AS "likeAmount" 
        FROM likes
        WHERE "postId"=$1
        GROUP BY "postId"`
        , [postId])

        if (likeAmount?.rows[0]?.likeAmount){likeAmount = likeAmount.rows[0].likeAmount}
        else {likeAmount = 0}

        let isLiked = await connection.query(`SELECT * FROM likes WHERE "postId"=$1 AND "userId"=$2`,[postId, userId])

        if (isLiked?.rows[0]) {isLiked = true} 
        else {isLiked = false}

        const whoLiked = await formatWhoLike({postId, isLiked, userId})
    
        res.send({likeAmount, isLiked, whoLiked: whoLiked})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    
}
async function insertLike (req, res){
    
    const postId = req.params?.postId
    const { userId } = res.locals.tokenData

    try {   
        
        await connection.query(`INSERT INTO likes ("postId", "userId") VALUES ($1, $2)`, [postId, userId])
        res.sendStatus(200)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
async function removeLike (req, res){

    const postId = req.params?.postId
    const { userId } = res.locals.tokenData
    
    try {   
        
        await connection.query(`DELETE FROM likes WHERE "postId"=$1 AND "userId"=$2`, [postId, userId])
        res.sendStatus(200)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
async function teste (req,res){

    let likeAmount = await connection.query(`
        SELECT COUNT(*) AS "likeAmount" 
        FROM likes
        WHERE "postId"=$1
        GROUP BY "postId"`
        , [1])


    res.send(likeAmount.rows[0].likeAmount)
}

export {likeAmount, insertLike, removeLike, teste}