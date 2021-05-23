import { logger } from "../utils";
import { db } from '../data-access';
import { UserGroup, User } from '../models';
import { Op } from 'sequelize';

export class UserSevice {
    static addUsersToGroup (groupId, userIds) {
        try {
            const result = db.transaction(async (t) => {
                UserGroup.create({
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

    static autoSuggestUsers (loginSubstring, limit) {
        const users = User.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            limit: limit
        })

        return users;
    };

    static getActualUsers () {
        const users = User.findAll({
            where: {
                isdeleted: false
            }
        })
    
        return users;
    };

    static getUserById (id) {
        const user = User.findAll({
            where: {
                isdeleted: false,
                id: id
            }
        })

        return user;
    };

    static createUser (value) {
        const { id, login, password, age } = value;
        const user = User.create({
            id: id,
            login: login,
            password: password,
            age: age,
            isdeleted: false
        })

        return user;
    } 

    static updateUser (id, value) {
        const data = value;
        const user =  User.findByPk(id)
            .then(user => {
                for (const property in data) {
                    user[property] = data[property];
                }
                user.save()
                return data;
            })
        
        return user;
    }

    static deleteUser (id) {
        User.update({
            isdeleted: true
        }, { 
            where: {
                isdeleted: false,
                id: id
            }
        });

        UserGroup.update({
                userid: []
            }, { 
                where: {
                    userid: [id]
                }
            });     
        console.log('Deleting Group');
    }
}
