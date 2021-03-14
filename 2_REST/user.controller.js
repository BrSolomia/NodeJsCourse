import { users } from './data';
import { userCreateSchema, userUpdateSchema } from './user.validators';

const autoSuggestUsers = (loginSubstring, limit) => {
    const actualUsers = getActualUserl();
    const result = actualUsers.filter((user) => {
        const result = user.login.includes(loginSubstring);
        return result;
    }).sort((user1, user2) => {
        const login1 = user1.login.toUpperCase(); // ignore upper and lowercase
        const login2 = user2.login.toUpperCase(); // ignore upper and lowercase
        if (login1 < login2) {
            return -1;
        }
        if (login1 > login2) {
            return 1;
        }
        return 0;
    }).slice(0,limit); 
    
    if (!result.length) {
        throw new Error('No user was found');
    }
    return result;
};

const getActualUserl = () => {
    return users.filter((user) => user.isDeleted === false);
};

export const getUsers = (req, res, next) => {
    res.json(getActualUserl());
}

export const getAutoSuggestUsers = (req, res, next) => {
    const { loginSubstring, limit } = req.body;
    try {
        const suggestedUsers = autoSuggestUsers(loginSubstring, limit);
        res.status(404).json(suggestedUsers);
    } catch (err) {
        res.json(err.message);
    }
}

export const getUserById = (req, res, next) => {
    const { id } = req.params;
    const actualUsers = getActualUserl();
    const result = actualUsers.find(user => user.id === id);

    if (!result) {
        res.status(404).json('User not found');
    } else {
        res.json(result);
    }
}

export const createUser = (req, res, next) => {
    const { error, value } = userCreateSchema.validate(req.body);

    if (!error) {
        const { id, login, password, age } = value;
        const objToAdd = {};

        const actualUsers = getActualUserl();
        const userById = actualUsers.find(user => user.id === id);

        if (!userById) {
            objToAdd.id = id;
            objToAdd.login = login;
            objToAdd.password = password;
            objToAdd.age = age;
            objToAdd.isDeleted = false;

            users.push(objToAdd);
            res.json(objToAdd); 
        } else {
            res.status(404).json('User already exists');
        }
    } else {
        res.status(400).json(error.message);
    }
}

export const updateUserById = (req, res, next) => {
    const { error, value } = userUpdateSchema.validate(req.body);

    if (!error) {
        const { id } = req.params;
        const data = value;
        const actualUsers = getActualUserl();
        const index = actualUsers.findIndex(user => user.id === id);

        if (index === -1) {
            res.status(404).json('User not found');
        } else {
            for (const property in data) {
                actualUsers[index][property] = data[property];
            }
        
            res.json(actualUsers[index]);
        }
    } else {
        res.status(400).json(error.message);
    }  
}

export const deleteUserById = (req, res, next) => {
    const { id } = req.params;
    const userToDelete = users.find(user => user.id === id);

    if ( !userToDelete) {
        res.status(404).json('User not found');
    } else {
        userToDelete.isDeleted = true;
        res.json(users[index]);
    }
}