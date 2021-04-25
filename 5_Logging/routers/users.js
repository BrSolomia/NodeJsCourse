import express from 'express';
import { loggerMid, loggerErrorMid } from '../middlewares';
import { getUsers, getAutoSuggestUsers, getUserById, createUser, updateUserById, deleteUserById } from '../services';

export const userRouter = express.Router();

userRouter.get('/', loggerMid.log('Get User'), loggerErrorMid.log(), getUsers);
userRouter.get('/auto-suggest', loggerMid.log('Get autosuggested user'), loggerErrorMid.log(), getAutoSuggestUsers);
userRouter.get('/:id', loggerMid.log('Get user by id'), loggerErrorMid.log(), getUserById);
userRouter.post('/create', loggerMid.log('Create user'), loggerErrorMid.log(), createUser);
userRouter.post('/update/:id', loggerMid.log('Update user by id'), loggerErrorMid.log(), updateUserById);
userRouter.delete('/delete/:id', loggerMid.log('Delete user'), loggerErrorMid.log(), deleteUserById);
