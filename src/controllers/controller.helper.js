import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const createToken = (payload, expiration = '1h') => jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: expiration });
const compareToken = (token, callback) => jwt.verify(token, process.env.TOKEN_SECRET, callback);
export { createToken, compareToken };