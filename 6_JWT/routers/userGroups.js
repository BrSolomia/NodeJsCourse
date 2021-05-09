import express from 'express';
import { loggerMid, loggerErrorMid } from '../middlewares';
import { getUserGroups, createUserGroup } from '../services/userGroup.service';
import { verifyToken } from '../services';

export const userGroupRouter = express.Router();

userGroupRouter.get('/', verifyToken, loggerMid.log('Get user group'), loggerErrorMid.log(), getUserGroups );
userGroupRouter.post('/create', verifyToken, loggerMid.log('Create user group'), loggerErrorMid.log(), createUserGroup );
