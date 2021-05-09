import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './data-access';
import { groupRouter, loginRouter, userGroupRouter, userRouter } from './routers';

const app = express();

db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((err) => console.log('Unable to connect to the database:', err));

app.listen(3000);
app
    .use(cors())        
    .use(bodyParser.json())
    .use('/user', userRouter)
    .use('/group', groupRouter)
    .use('/userGroup',userGroupRouter)
    .use('/login', loginRouter);
