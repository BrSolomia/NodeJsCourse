import { addUsersToGroup } from '../controllers';
import { UserGroup } from '../models';
import { userGroupCreateSchema } from '../validators';

export const getUserGroups = (_req, res) => {
    UserGroup.findAll()
        .then((data) => {
            console.log('Getting Groups');
            res.send(data).status(200);
        })
        .catch((err) => {
            console.log('Something went wrong with error: ', err);
            res.status(500);
        })
};

export const createUserGroup = (req, res) => {
    const { error, value } = userGroupCreateSchema.validate(req.body);

    if (!error) {
        const {groupId, userIds} = value;
        try {
            const userGroup = addUsersToGroup(groupId, userIds);
            res.send(userGroup).status(200);
        } catch (err) {
            console.log('Transaction failed with error: ', err);
            res.status(500);
        }
    } else {
        res.status(400).json(error.message);
    }
};