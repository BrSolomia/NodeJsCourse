import express from 'express';
import { loggerMid, loggerErrorMid } from '../middlewares';
import { getUserGroups, createUserGroup } from '../services/userGroup.service';

export const userGroupRouter = express.Router();

userGroupRouter.get('/', loggerMid.log('Get user group'), loggerErrorMid.log(), getUserGroups );
userGroupRouter.post('/create', loggerMid.log('Create user group'), loggerErrorMid.log(), createUserGroup );
