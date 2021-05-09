import { Group, UserGroup } from '../models';
import { groupCreateSchema, groupUpdateSchema } from '../validators';

export const getGroups = (_req, res) => {
    Group.findAll()
        .then((data) => {
            console.log('Getting Groups');
            res.send(data).status(200);
        })
        .catch((err) => {
            console.log('Something went wrong with error: ', err);
            res.status(500);
        })
};

export const getGroupById = (req, res) => {
    const { id } = req.params;

    Group.findAll({
        where: {
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

export const createGroup = (req, res) => {
    const { error, value } = groupCreateSchema.validate(req.body);

    if (!error) {
        const { id, name, permissions } = value;
        Group.create({
            id: id,
            name: name,
            permissions: permissions
        }).then((data) => {
            console.log('Creating Group');
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

export const updateGroupById = (req, res) => {
    const { error, value } = groupUpdateSchema.validate(req.body);

    if (!error) {
        const { id } = req.params;
        const data = value;
        Group.findByPk(id)
            .then(group => {
                for (const property in data) {
                    group[property] = data[property];
                }
                group.save()
                res.send(group).status(200);
            })
            .catch(err => {
                console.log(err);
                res.status(500);
            })
    } else {
        res.status(400).json(error.message);
    }
};

export const deleteGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const group = await Group.findByPk(id);
        const userGroup = await UserGroup.findOne({where: {
            groupid: id
        }}); 
            
        await group.destroy();
        await userGroup.destroy();

        console.log('Deleting Group');
        res.status(200);
    } catch (err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};