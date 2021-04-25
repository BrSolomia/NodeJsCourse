import express from 'express';
import { loggerMid, loggerErrorMid } from '../middlewares';
import { createGroup, deleteGroupById, getGroupById, getGroups, updateGroupById } from '../services';

export const groupRouter = express.Router();

groupRouter.get('/', loggerMid.log('Get Group'), loggerErrorMid.log(), getGroups );
groupRouter.get('/:id', loggerMid.log('Get group by id'), loggerErrorMid.log(), getGroupById);
groupRouter.post('/create', loggerMid.log('Create group'), loggerErrorMid.log(), createGroup);
groupRouter.post('/update/:id', loggerMid.log('Update group by id'), loggerErrorMid.log(), updateGroupById);
groupRouter.delete('/delete/:id', loggerMid.log('Delete group'), loggerErrorMid.log(), deleteGroupById);