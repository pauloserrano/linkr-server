import bcrypt from "bcrypt";

import { STATUS } from "../enums/status.js";
import * as repository from "../repositories/auth.repository.js"; 
import registerSchema from "../schemas/register.schema.js";
import loginSchema from "../schemas/login.schema.js";
import { compareToken } from "../controllers/controller.helper.js";

const verifyNewUser = async (req, res, next) => {
    // checks if request body is correct
    const { password, name, pictureUrl } = req.body;
    const email = req.body.email?.toLowerCase();

    const isValid = registerSchema.validate({ email, password, name, pictureUrl }, { abortEarly: true });
    if(isValid.error) return res.status(STATUS.UNPROCESSABLE_ENTITY).send(isValid.error.message);
    
    // checks if email is in use
    try {
        const conflict = await repository.selectUserByEmail(email);
        if(conflict.rowCount != 0) return res.status(STATUS.CONFLICT).send("email already registered");

    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }

    res.locals.user = { name, email, password, pictureUrl };
    next();
}

const verifyUser = async (req, res, next) => {
    // checks if request body is correct
    const { password } = req.body;
    const email = req.body.email?.toLowerCase();
    
    const isValid = loginSchema.validate({ email, password });
    if(isValid.error) return res.status(STATUS.UNPROCESSABLE_ENTITY).send(isValid.error.message);

    // checks user's existence and verify its password 
    try {
        const user = await repository.selectUserByEmail(email);
        if(user.rowCount != 1) return res.status(STATUS.UNAUTHORIZED).send("email and password dont match"); // email not registered (no user)

        const validLogin = bcrypt.compareSync(password, user.rows[0].password);
        if(!validLogin) return res.status(STATUS.UNAUTHORIZED).send("email and password dont match"); // wrong password
        
        res.locals.userId = user.rows[0].id; // id to create the login session   
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }

    next();
}

const verifyConnection = async (req, res, next) => {
    // get pure token
    const token = req.headers.authorization?.replace("Bearer ", '');
    if(!token) return res.sendStatus(STATUS.UNAUTHORIZED);

    // check cover isnt expired or doesnt match any valid token
    compareToken(token, (error, user) => {
        if(error) {
            console.log(error)
            return res.sendStatus(STATUS.UNAUTHORIZED);
        }
        res.locals.user = user;
        next(); 
    })
}

const verifyRefreshToken = async (req, res, next) => {
    const { refreshToken } = req.headers.refresh;

    try {
        const result = await repository.selectRefreshToken(refreshToken);
        if(result.rowCount === 0 || !result.rows[0].active) return res.sendStatus(STATUS.UNAUTHORIZED);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }
}

export { verifyNewUser, verifyUser, verifyRefreshToken, verifyConnection };