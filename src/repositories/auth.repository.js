import connection from "../database/db.js";
import { TABLES } from "../enums/tables.js";
import { FIELDS } from "../enums/fields.js";

const { USERS, SESSIONS } = TABLES
const { ID, NAME, PICTURE_URL, PASSWORD, EMAIL } = FIELDS.USERS;
const { ACTIVE, TOKEN } = FIELDS.SESSIONS;

const insertUser = async (name, email, hash, pictureUrl) => {
    return await connection.query(`
            INSERT INTO ${USERS} (${NAME}, ${EMAIL}, ${PASSWORD}, ${PICTURE_URL}) 
            VALUES ($1, $2, $3, $4);`, [name, email, hash, pictureUrl]);
}

const selectUserByEmail = async email => {
    return await connection.query(`SELECT * FROM ${USERS} WHERE ${EMAIL} = $1 LIMIT 1;`, [email]);
}

const selectUserById = async userId => {
    return await connection.query(`
        SELECT u.${PICTURE_URL}, u.${NAME}, u.${EMAIL} FROM ${USERS} u WHERE ${ID} = $1 LIMIT 1;`, [userId]);
}

const insertRefreshToken = async regenerationToken => {
    return await connection.query(`
        INSERT INTO ${SESSIONS} (${TOKEN}) VALUES ($1)`, [regenerationToken])
}

const selectRefreshToken = async regenerationToken => {
    return await connection.query(`
        SELECT * FROM ${SESSIONS} WHERE ${TOKEN} = $1 LIMIT 1;`, [regenerationToken]);
}

const endSession = async refreshToken => {
    return await connection.query(`
        UPDATE ${SESSIONS} SET ${ACTIVE} = false WHERE ${TOKEN} = $1;`, [refreshToken]);
}

export { insertUser, selectUserByEmail, selectUserById, insertRefreshToken, selectRefreshToken, endSession };