import express from 'express';
import bodyParser from 'body-parser';
import { db } from './data-access';
import { userRouter } from './routers';

const app = express();

db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((err) => console.log('Unable to connect to the database:', err));

app.listen(3000);
app
    .use(bodyParser.json())
    .use('/', userRouter);
