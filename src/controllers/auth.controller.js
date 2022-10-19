import bcrypt from 'bcrypt';

import { createToken } from './controller.helper.js';
import * as repository from '../repositories/auth.repository.js';
import STATUS from "../enums/status.js";
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
    // generating token
    const { userId } = res.locals;    
    const token = createToken({ userId });
    
    return res.status(STATUS.OK).send({ token });
}

export { register, login };