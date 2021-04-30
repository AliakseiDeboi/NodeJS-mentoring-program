"use strict";
exports.__esModule = true;
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
/**
 * Here is connection to my PG
 */
var DB_CONNECTION_URI = 'postgres://imzpxulr:tLyKeDx6C_YpgtzT3IxLRBxDCODn9oL1@kandula.db.elephantsql.com:5432/imzpxulr';
exports.sequelize = new sequelize_1.Sequelize(DB_CONNECTION_URI, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
