import connection from "../database/db.js";

async function rankingHashtags (req, res){

    try {

        const hasUser = await connection.query(`
        SELECT COUNT(*) AS "usesCount", name AS "hashtagName" FROM "postsHashtags" 
        JOIN hashtags ON "postsHashtags"."hashtagId"= hashtags.id 
        GROUP BY hashtags.name
        ORDER BY "usesCount" DESC`)
        
        res.send(hasUser.rows)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
function rankingTeste (req, res){
    const array = ["javascript", "react", "react-native", "material", "web-dev", "mobile", "css", "html", "node", "sql"]
      
    setTimeout(()=>{res.send(array)}, 1000) 
}
async function searchHashtagPost (req, res) {
    try {
        /*
        const hasHashtag = await connection.query(`SELECT * FROM hashtags WHERE name=$1`, [req.params.hashtag])

        if(hasHashtag.rows[0]){
            res.send("tem hashtag")
        }
        */
        const teste = await connection.query(`SELECT * FROM posts WHERE "userId"=$1 ORDER BY id ASC;`, [1])
        const teste2 = teste.rows[0]
        res.send(teste2)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
export {rankingHashtags, rankingTeste, searchHashtagPost}