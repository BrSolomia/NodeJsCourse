import { GroupService } from '../services';
import { groupCreateSchema, groupUpdateSchema } from '../validators';

export const getGroups = (_req, res) => {
    try {
        console.log('Getting Groups');
        const groups = GroupService.getGroups();
        res.send(groups);
    } catch (err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};

export const getGroupById = (req, res) => {
    const { id } = req.params;

    try {
        console.log('Getting User by id');
        const group = GroupService.getGroupById(id);
        res.send(group);
    } catch (err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};

export const createGroup = (req, res) => {
    const { error, value } = groupCreateSchema.validate(req.body);

    if (error) {
        res.status(400);
    }

    try {
        console.log('Creating Group');
        const group = GroupService.createGroup(value);
        res.send(group);
    } catch (err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};

export const updateGroupById = (req, res) => {
    const { error, value } = groupUpdateSchema.validate(req.body);

    if (error) {
        res.status(400);
    }

    try {
        const group = GroupService.updateGroupById(id, value);
        res.send(group);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export const deleteGroupById = (req, res) => {
    const { id } = req.params;
    try {
        GroupService.deleteGroup(id);

        console.log('Deleting Group');
        res.json("Group deleted");
    } catch (err) {
        console.log('Something went wrong with error: ', err);
        res.status(500);
    }
};