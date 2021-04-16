import { Sequelize } from 'sequelize';

/**
 * Here is connection to my PG
 */
const DB_CONNECTION_URI = 'postgres://imzpxulr:tLyKeDx6C_YpgtzT3IxLRBxDCODn9oL1@kandula.db.elephantsql.com:5432/imzpxulr';
export const sequelize = new Sequelize(DB_CONNECTION_URI, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
