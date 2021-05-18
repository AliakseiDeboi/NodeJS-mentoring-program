"use strict";
exports.__esModule = true;
exports.UserGroup = void 0;
var sequelize_1 = require("sequelize");
var database_connection_1 = require("../data-access/database.connection");
var user_model_definition_1 = require("./user.model-definition");
var group_model_definition_1 = require("./group.model-definition");
/**
 * This is user-group model definition
 */
exports.UserGroup = database_connection_1.sequelize.define('UserGroup', {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_model_definition_1.User,
            key: 'id'
        }
    },
    groupId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: group_model_definition_1.Group,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});
