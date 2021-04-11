import express from 'express';
import { getUserGroups, createUserGroup } from '../services/userGroup.service';

export const userGroupRouter = express.Router();

userGroupRouter.get('/', getUserGroups );
userGroupRouter.post('/create', createUserGroup );
