import express from 'express';
import { createGroup, deleteGroupById, getGroupById, getGroups, updateGroupById } from '../services';

export const groupRouter = express.Router();

groupRouter.get('/', getGroups );
groupRouter.get('/:id', getGroupById);
groupRouter.post('/create', createGroup);
groupRouter.post('/update/:id', updateGroupById);
groupRouter.delete('/delete/:id', deleteGroupById);