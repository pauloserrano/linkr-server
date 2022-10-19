import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const createToken = payload => jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
const compareToken = (token, callback) => jwt.verify(token, process.env.TOKEN_SECRET, callback);

export { createToken, compareToken };