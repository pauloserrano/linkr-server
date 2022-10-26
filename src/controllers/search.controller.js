import { STATUS } from "../enums/status.js";
import * as repository from "../repositories/search.repository.js";

const searchUsers = async (req, res) => {
    const namePart = req.query.namePart || '';
    
    try {
        const matchedUsers = await repository.selectUsersByNamePart(namePart);
        return res.status(STATUS.OK).send(({ profiles: matchedUsers.rows }))
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }
}

export { searchUsers };