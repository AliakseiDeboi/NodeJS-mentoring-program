import { Sequelize } from 'sequelize';

/**
 * Here is connection to my PG
 */
// @ts-ignore
const DB_URI: string = process.env.DB_URI;
export const sequelize = new Sequelize(DB_URI, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
