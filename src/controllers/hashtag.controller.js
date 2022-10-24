import connection from "../database/db.js";

async function rankingHashtags (req, res){

    try {

        let rankingArray = await connection.query(`
        SELECT hashtags.name, COUNT (*) AS "usesCount"
        FROM "postsHashtags" 
        JOIN hashtags ON "postsHashtags"."hashtagId" = hashtags.id
        GROUP BY hashtags.name
        ORDER BY "usesCount" DESC`)

        rankingArray = rankingArray.rows.map(e => e.name)
        
        res.send(rankingArray)

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
        const hashtagName = req.params?.hashtag

        const hashtagArray = await connection.query(`
        SELECT posts.link, posts.body, posts."userId",posts."metaTitle",posts."metaDescription",posts."metaImage",users."pictureUrl",posts.id
        FROM "postsHashtags" 
        JOIN hashtags ON "postsHashtags"."hashtagId" = hashtags.id
        JOIN posts ON "postsHashtags"."postId" = posts.id
        JOIN users ON posts."userId" = users.id
        WHERE hashtags.name=$1;
        `, [hashtagName])

        res.send(hashtagArray.rows)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
export {rankingHashtags, rankingTeste, searchHashtagPost}