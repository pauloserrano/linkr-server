import { STATUS } from "../enums/status.js";
import { compareToken } from "../controllers/controller.helper.js";

const verifyLike = async (req, res, next) => {

    const token = req.headers.authorization?.replace("Bearer ", '');
    
    if(!token) return res.sendStatus(STATUS.UNAUTHORIZED);
    
    compareToken(token, (error, tokenData) => {
        if(error || tokenData.type != "access") {
            console.log(error);
            return res.sendStatus(STATUS.UNAUTHORIZED);
        }
        res.locals.tokenData = tokenData;
        next(); 
    })
    
    res.locals.tokenData = tokenData;
    next(); 

}
export { verifyLike };