"use strict";
exports.__esModule = true;
exports.Group = void 0;
var database_connection_1 = require("../data-access/database.connection");
var sequelize_1 = require("sequelize");
var group_interface_1 = require("../types/group.interface");
/**
 * This is group model definition
 */
exports.Group = database_connection_1.sequelize.define('Group', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    permissions: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ENUM({
            values: group_interface_1.permissions
        })),
        allowNull: false
    }
}, {
    freezeTableName: true
});
