import express from 'express';
import { loggerMid, loggerErrorMid } from '../middlewares';
import { createGroup, deleteGroupById, getGroupById, getGroups, updateGroupById } from '../controllers';
import { verifyToken } from '../controllers';

export const groupRouter = express.Router();

groupRouter.get('/', verifyToken, loggerMid.log('Get Group'), loggerErrorMid.log(), getGroups );
groupRouter.get('/:id', verifyToken, loggerMid.log('Get group by id'), loggerErrorMid.log(), getGroupById);
groupRouter.post('/create', verifyToken, loggerMid.log('Create group'), loggerErrorMid.log(), createGroup);
groupRouter.post('/update/:id', verifyToken, loggerMid.log('Update group by id'), loggerErrorMid.log(), updateGroupById);
groupRouter.delete('/delete/:id', verifyToken, loggerMid.log('Delete group'), loggerErrorMid.log(), deleteGroupById);