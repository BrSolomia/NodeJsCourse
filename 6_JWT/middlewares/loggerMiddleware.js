import { logger } from "../utils";

function loggerMiddleware (content) {
    return (req, _res, next) => {
        logger.info(`${content}. Params: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}`);
        next();
    }
} 

export const loggerMid = { log: loggerMiddleware };
