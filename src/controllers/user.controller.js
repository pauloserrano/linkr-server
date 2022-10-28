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

        res.send({postArray:userPosts.rows, userName:userName.rows[0]?.name, userPictureUrl:userName.rows[0]?.pictureUrl})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
}

async function GetAllUsers (req, res){

    const { userId } = res.locals.tokenData

    try {
        
        const users = await connection.query(`
        SELECT users.id, users.name, users."pictureUrl"
        FROM users 
        WHERE id!=$1
        `
        , [userId])

        res.send(users.rows)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export {UserPosts, GetAllUsers}