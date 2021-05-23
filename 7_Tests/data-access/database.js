import { Sequelize } from 'sequelize';

const dburl = process.env.DB_URL;

export const db = new Sequelize(dburl);