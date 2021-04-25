// import { User } from './data';
import { userCreateSchema, userUpdateSchema } from '../validators';
import { User, UserGroup } from '../models';
import { Op } from 'sequelize';

const autoSuggestUsers = (loginSubstring, limit) => {
    return User.findAll({
        where: {
            login: {
                [Op.like]: `%${loginSubstring}%`
            }
        },
        limit: limit
    })
};


const getActualUsers = () => {
    return User.findAll({
        where: {
            isdeleted: false
        }
    })
};


export const getUsers = (_req, res) => {
    getActualUsers().then((data) => {
            console.log('Getting Users');
            res.send(data).status(200);
        })
        .catch((err) => {
            console.log('Something went wrong with error: ', err);
            res.status(500);
        })
};

export const getAutoSuggestUsers = (req, res) => {
    const { loginSubstring, limit } = req.body;
    autoSuggestUsers(loginSubstring, limit)
        .then((data) => {
            console.log('Getting Users suggestion');
            res.send(data).status(200);
        })
        .catch((err) => {
            console.log('Something went wrong with error: ', err);
            res.status(500);
        })
};

export const getUserById = (req, res) => {
    const { id } = req.params;

    User.findAll({
        where: {
            isdeleted: false,
            id: id
        }
    }).then((data) => {
        console.log('Getting User by id');
        res.send(data).status(200);
    })
    .catch((err) => {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    })
};

export const createUser = (req, res, next) => {
    const { error, value } = userCreateSchema.validate(req.body);

    if (!error) {
        const { id, login, password, age } = value;
        User.create({
            id: id,
            login: login,
            password: password,
            age: age,
            isdeleted: false
        }).then((data) => {
            console.log('Creating User');
            res.send(data).status(200);
        })
        .catch((err) => {
            console.log('Something went wrong with error: ', err);
            res.status(500);
        })
    } else {
        res.status(400).json(error.message);
    }
};

export const updateUserById = (req, res) => {
    const { error, value } = userUpdateSchema.validate(req.body);

    if (!error) {
        const { id } = req.params;
        const data = value;
        User.findByPk(id)
            .then(user => {
                for (const property in data) {
                    user[property] = data[property];
                }
                user.save()
                res.send(data).status(200);
            })
            .catch(err => {
                console.log(err);
                res.status(500);
            })
    } else {
        res.status(400).json(error.message);
    }
};

export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        await User.update({
                isdeleted: true
            }, { 
                where: {
                    isdeleted: false,
                    id: id
                }
            });

        await UserGroup.update({
                userid: []
            }, { 
                where: {
                    userid: [id]
                }
            });     
        console.log('Deleting Group');
        res.status(200);
    } catch (err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};