import { logger } from "../utils";
import { db } from '../data-access';
import { UserGroup } from '../models';

export const addUsersToGroup = async (groupId, userIds) => {
    try {
        const result = await db.transaction(async (t) => {
            await UserGroup.create({
                groupid: groupId,
                userid: userIds
            }, { transaction: t })
        });
        
        return result;
    } catch (err) {
        logger.error(`{ methodName: ${addUsersToGroup.name}, arguments: ${groupId}, ${userIds}, errorMessage: ${err.message} }`);
        console.log('Transaction failed with error: ', err);
    }
};