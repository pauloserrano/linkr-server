import connection from "../database/db.js";

async function followVerify (req, res, next){
    
    const { userId } = res.locals.tokenData
    const { followedId } = req.body

    try {
        if( userId === followedId){
            res.sendStatus(400)
        }
        const wasFollow = await connection.query(`
            SELECT * FROM follows WHERE "userId"=$1 AND "followedId"=$2
        `, [userId, followedId])
        
        if(wasFollow.rows[0] !== undefined){
            return res.sendStatus(409)
        }

        const wasFollowed = await connection.query(`
            SELECT * FROM users WHERE id=$1
        `, [followedId])

        if(wasFollowed.rows[0] === undefined){
            return res.sendStatus(404)
        }
        
        next()

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export {followVerify}