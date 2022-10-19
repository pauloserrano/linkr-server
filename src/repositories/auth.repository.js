import connection from "../database/db.js";
import { USERS, SESSIONS } from "../enums/tables.js";
import FIELDS from "../enums/fields.js";

const { NAME, ID, PICTURE_URL, PASSWORD, EMAIL } = FIELDS.USERS;

const insertUser = async (name, email, hash, pictureUrl) => {
    return await connection.query(`
            INSERT INTO ${USERS} (${NAME}, ${EMAIL}, ${PASSWORD}, "${PICTURE_URL}") 
            VALUES ($1, $2, $3, $4);`, [name, email, hash, pictureUrl]);
}

const selectUserByEmail = async email => {
    return await connection.query(`SELECT * FROM ${USERS} WHERE ${EMAIL} = $1 LIMIT 1;`, [email]);
}

const insertRegenerationToken = async token => {
    return await connection.query(`
        INSERT INTO ${SESSIONS} ($)
    `)
}

export { insertUser, selectUserByEmail };