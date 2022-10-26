import connection from "../database/db.js";

async function allFollows (req, res){

    const { userId } = res.locals.tokenData

    try {
        
        const followsArray = await connection.query(`SELECT * FROM follows WHERE "userId"=$1`, [userId])

        res.send(followsArray)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function followsById (req, res){

    const { userId } = res.locals.tokenData
    const { followedId } = req.params

    try {

        const hasFollow = await connection.query(`
        SELECT *
        FROM follows
        WHERE "userId"=$1 AND "followedId"=$2
        `, [userId, followedId])

        if (hasFollow.rows[0] === undefined){
            return res.send(false)
        } else {
            return res.send(true)
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function followInsert (req, res){

    const { userId } = res.locals.tokenData
    const { followedId } = req.body

    try {

        await connection.query(`INSERT INTO follows ("userId", "followedId") VALUES ($1, $2)`, [userId, followedId])
        res.sendStatus(200)

    } catch (error) {
        
        console.log(error)
        res.sendStatus(500)
    }   

}

export {followsById, followInsert, allFollows}