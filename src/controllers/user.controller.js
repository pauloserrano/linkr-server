import connection from "../database/db.js";

async function UserPosts (req, res){

    const userId = req.params?.id

    try {

        const userPosts = await connection.query(`
        SELECT posts.link, posts.body, posts."userId",posts."metaTitle",posts."metaDescription",posts."metaImage",users."pictureUrl",posts.id
        FROM posts 
        JOIN users ON posts."userId" = users.id
        WHERE posts."userId"=$1;
        `
        , [userId])
        const userName = await connection.query(`SELECT users.name, users."pictureUrl" FROM users WHERE id=$1`, [userId])

        res.send({postArray:userPosts.rows, userName:userName.rows[0]?.name, userPictureUrl:userPosts.rows[0]?.pictureUrl})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
}

export {UserPosts}