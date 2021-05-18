"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var users_controller_1 = require("./controllers/users.controller");
var bodyParser = __importStar(require("body-parser"));
var database_connection_1 = require("./data-access/database.connection");
var user_model_definition_1 = require("./models/user.model-definition");
var groups_controller_1 = require("./controllers/groups.controller");
var group_model_definition_1 = require("./models/group.model-definition");
var user_group_model_definition_1 = require("./models/user-group.model-definition");
var port = process.env.PORT || 3000;
var app = express_1["default"]();
/**
 * Configuring main application
 */
app.use(morgan_1["default"]('dev'));
app.use(bodyParser.json());
app.use('/users', users_controller_1.routerUsers);
app.use('/groups', groups_controller_1.routerGroups);
app.use(function (req, res) {
    res.status(400).json({
        error: {
            message: 'Not found'
        }
    });
});
app.use(function (err, req, res) {
    res.status(404);
    res.json({
        error: {
            message: err.message
        }
    });
});
database_connection_1.sequelize.authenticate().then(function () {
    user_model_definition_1.User.sync().then();
    group_model_definition_1.Group.sync().then();
    user_group_model_definition_1.UserGroup.sync().then();
    user_model_definition_1.User.belongsToMany(group_model_definition_1.Group, { through: user_group_model_definition_1.UserGroup, foreignKey: 'userId' });
    group_model_definition_1.Group.belongsToMany(user_model_definition_1.User, { through: user_group_model_definition_1.UserGroup, foreignKey: 'groupId' });
    app.listen(port, function () { return console.log("server is running on port " + port); });
})["catch"](function (err) { return console.log(err); });
