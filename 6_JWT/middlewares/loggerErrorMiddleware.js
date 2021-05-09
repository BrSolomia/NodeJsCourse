import { logger } from "../utils";

function loggerErrorMiddleware () {
    return (_req, res, next) => {
        process
            .on('unhandledRejection', (err, p) => {
                logger.error('Unhandled Exception: ' + err);
                res.status(500).send(err.message);
            })
            .on('uncaughtException', err => {
                logger.error('Uncaught Exception: ' + err);
                res.status(500).send(err.message); 
            });
        next();
    }
} 

export const loggerErrorMid = { log: loggerErrorMiddleware };
