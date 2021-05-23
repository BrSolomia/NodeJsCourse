import { Group, UserGroup } from "../models";

export class GroupService {
    static getGroups () {
        const groups = Group.findAll();
        return groups;
    }

    static getGroupById (id) {
        const group = Group.findAll({
            where: {
                id: id
            }
        });
        
        return group;
    }

    static createGroup (value) {
        const { id, name, permissions } = value;
        const group = Group.create({
            id: id,
            name: name,
            permissions: permissions
        })

        return group;
    }

    static updateGroupById (id, value) {
        const data = value;
        const group = Group.findByPk(id)
            .then(group => {
                for (const property in data) {
                    group[property] = data[property];
                }
                group.save()
                return group;
            })

        return group;
    }

    static deleteGroup (id) {
        const group = Group.findByPk(id);
        const userGroup = UserGroup.findOne({where: {
            groupid: id
        }}); 
            
        group.destroy();
        userGroup.destroy();
    }
}