// import { User } from './data';
import { userCreateSchema, userUpdateSchema } from '../validators';
import { userGroupCreateSchema } from '../validators';
import { UserSevice } from '../services';

export const getUsers = (_req, res) => {
    try {
        console.log('Getting Users');
        const users = UserSevice.getActualUsers();
        res.send(users);
    } catch(err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};

export const getAutoSuggestUsers = (req, res) => {
    const { loginSubstring, limit } = req.body;

    try {
        console.log('Getting Users suggestion');
        const autoSuggestedUsers = UserSevice.autoSuggestUsers(loginSubstring, limit);
        res.send(autoSuggestedUsers);
    } catch(err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};

export const getUserById = (req, res) => {
    const { id } = req.params;

    try {
        console.log('Getting User by id');
        const user = UserSevice.getUserById(id);
        res.send(user);
    } catch (err) {
        console.log('Something went wrong with error: ', err.message);
        res.status(500);
    }
};

export const createUser = (req, res ) => {
    const { error, value } = userCreateSchema.validate(req.body);

    if (error) {
        res.send(error.message);
    }

    try {
        console.log('Creating User');
        const user = UserSevice.createUser(value);
        res.send(user);
    } catch (err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};

export const updateUserById = (req, res) => {
    const { error, value } = userUpdateSchema.validate(req.body);

    if (error) {
        res.send(error.message);
    }

    try {
        const { id } = req.params;
        const user = UserSevice.updateUser(id, value);
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export const deleteUserById = (req, res) => {
    const { id } = req.params;
    try {
        UserSevice.deleteUser(id);
        res.json("Group deleted");
    } catch (err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};

export const getUserGroups = (_req, res) => {
    try {
        console.log('Getting Groups');
        const groups = UserSevice.getUserGroups();
        res.send(groups);
    } catch (err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};
//-
export const createUserGroup = (req, res) => {
    const { error, value } = userGroupCreateSchema.validate(req.body);
    if (error) {
        res.status(400).json(error.message);
    }

    const {groupId, userIds} = value;
    try {
        const userGroup = UserSevice.addUsersToGroup(groupId, userIds);
        res.send(userGroup);
    } catch (err) {
        console.log('Transaction failed with error: ', err);
        res.status(500);
    }
};
