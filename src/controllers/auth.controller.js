import bcrypt from 'bcrypt';

import { createToken } from './controller.helper.js';
import * as repository from '../repositories/auth.repository.js';
import { STATUS } from "../enums/status.js";

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
    const token = createToken({ userId });
    const refreshToken = createToken({ userId }, '30d');

    try {
        const result = await repository.insertRefreshToken(refreshToken);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }

    return res.status(STATUS.OK).send({ token, refreshToken });
}

const newToken = async (req, res) => {

}

export { register, login };