import bcrypt from 'bcrypt';

import { createToken, compareToken } from './controller.helper.js';
import * as repository from '../repositories/auth.repository.js';
import { STATUS } from "../enums/status.js";
import { USERS, SESSIONS } from '../enums/tables.js';

const register = async (req, res) => {
    const { email, name, password, pictureUrl } = res.locals.user;
    const hash = bcrypt.hashSync(password, 10);

    try {
        const result = await repository.insertUser(name, email, hash, pictureUrl)
        return res.sendStatus(STATUS.CREATED);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }
}

const login = async (req, res) => {
    // generating tokens
    const { userId } = res.locals;    
    const token = createToken({ userId, type: "access" });
    const refreshToken = createToken({ userId, type: "refresh" }, '30d');

    try {
        const result = await repository.insertRefreshToken(refreshToken);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }

    return res.status(STATUS.OK).send({ token, refreshToken });
}

const logout = async (req, res) => {
    const { refreshToken } = res.locals;

    try {
        const deactivating = await repository.endSession(refreshToken);
        return res.sendStatus(STATUS.OK);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }
}

const sendNewToken = (req, res) => {
    const { refreshToken } = res.locals;
    
    compareToken(refreshToken, (error, tokenData) => {
        if(error || tokenData.type != "refresh") {
            console.log(error)
            return res.sendStatus(STATUS.UNAUTHORIZED);
        }
        const { userId } = tokenData;
        const accessToken = createToken({ userId, type: "access" }); // tokenData = { userId, type }
        return res.status(STATUS.OK).send(accessToken);
    })
}

export { register, login, sendNewToken, logout };