"use strict";
exports.__esModule = true;
exports.User = void 0;
var sequelize_1 = require("sequelize");
var database_connection_1 = require("../data-access/database.connection");
/**
 * This is user model
 */
exports.User = database_connection_1.sequelize.define('User', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /\S*(\S*([a-zA-Z]\S*[0-9])|([0-9]\S*[a-zA-Z]))\S*/
        }
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 4,
            max: 130
        }
    },
    isDeleted: {
        defaultValue: false,
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true
});
