import express from 'express';
import bodyParser from 'body-parser';
import { getAutoSuggestUsers, getUsers, getUserById, createUser, updateUserById, deleteUserById } from './user.controller';

const app = express();
const router = express.Router();

router.get('/users', getUsers);
router.get('/auto-suggest', getAutoSuggestUsers);
router.get('/:id', getUserById);
router.post('/create', createUser);
router.post('/update/:id', updateUserById);
router.delete('/delete/:id', deleteUserById);

app.listen(3000);
app
    .use(bodyParser.json())
    .use('/', router);
