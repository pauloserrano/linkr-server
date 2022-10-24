import connection from "../database/db.js";
import { TABLES } from "../enums/tables.js";
import { FIELDS } from "../enums/fields.js";

const { USERS } = TABLES;
const { ID, NAME, EMAIL, PICTURE_URL } = FIELDS.USERS;

const selectUsersByNamePart = async namePart => {
    return await connection.query(`
        SELECT 
            u.${ID} AS "userId", 
            u.${NAME} AS username,
            u.${EMAIL}, 
            u.${PICTURE_URL} 
        FROM ${USERS} u 
        WHERE ${NAME} LIKE $1;`,
        ["%" + namePart + "%" ]); 
}

export { selectUsersByNamePart };