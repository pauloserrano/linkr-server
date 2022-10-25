import connection from "../database/db.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

async function headersHashtagMiddleware (req, res, next){
    /*
    if (!req.headers.authorization?.includes("Bearer ")) {
        res.sendStatus(401)
    }

    const token = req.headers.authorization?.replace("Bearer ", "")
    
    if (!token) {
        res.sendStatus(401)
    }   
    
    try {

        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)

        const hasSession = connection.query(`SELECT * FROM sessions WHERE token=$1 AND active=$2`, [verifyToken, true]).rows[0]
        
        if (!hasSession){
            res.sendStatus(401)
        }

        next()

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    */
   next()
}

export {headersHashtagMiddleware}