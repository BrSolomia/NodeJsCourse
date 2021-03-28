import express from 'express';
import { getUsers, getAutoSuggestUsers, getUserById, createUser, updateUserById, deleteUserById } from '../services/user.service';

export const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/auto-suggest', getAutoSuggestUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/create', createUser);
userRouter.post('/update/:id', updateUserById);
userRouter.delete('/delete/:id', deleteUserById);