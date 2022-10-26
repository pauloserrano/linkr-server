import connection from "../database/db.js";

async function followsById (req, res){

    const { userId } = res.locals.tokenData

    try {

        let rankingArray = await connection.query(`
        SELECT *
        FROM follows
        WHERE "userId"=$1
        `, [userId])

        rankingArray = rankingArray.rows.map(e => e.name)
        
        res.send(rankingArray)

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

export {followsById, followInsert}