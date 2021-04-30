"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GroupsService = void 0;
var group_model_definition_1 = require("../models/group.model-definition");
var user_group_model_definition_1 = require("../models/user-group.model-definition");
var database_connection_1 = require("../data-access/database.connection");
/**
 * This class describes Group Service and contains operations that
 * can be applied to users
 */
var GroupsService = /** @class */ (function () {
    function GroupsService() {
    }
    /**
     * This method describes logic of getting group by id
     * @param id string
     */
    GroupsService.prototype.getGroupById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, group_model_definition_1.Group.findByPk(id)];
            });
        });
    };
    /**
     * This method describes logic of getting all groups
     */
    GroupsService.prototype.getAllGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, group_model_definition_1.Group.findAll({
                        order: [['name', 'ASC']]
                    })];
            });
        });
    };
    /**
     * This method describes logic of adding group to DB
     * @param newGroup GroupCreationAttributes
     */
    GroupsService.prototype.addGroup = function (newGroup) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, group_model_definition_1.Group.create(newGroup)];
            });
        });
    };
    /**
     * This method describes logic of updating group
     * @param targetGroup GroupInstance
     * @param group Partial<GroupAttributes>
     */
    GroupsService.prototype.updateGroup = function (targetGroup, group) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, group_model_definition_1.Group.update(__assign({}, group), { where: { id: targetGroup.id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method describes logic of deleting group
     * @param targetGroup GroupInstance
     */
    GroupsService.prototype.deleteGroup = function (targetGroup) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, targetGroup.destroy()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method describes logic of adding users to group. Transactions are used
     * @param groupId number
     * @param userIds array of numbers
     */
    GroupsService.prototype.addUsersToGroup = function (groupId, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var t, userGroupRelations, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_connection_1.sequelize.transaction()];
                    case 1:
                        t = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, user_group_model_definition_1.UserGroup.destroy({ where: { groupId: groupId }, transaction: t })];
                    case 3:
                        _a.sent();
                        userGroupRelations = userIds.map(function (userId) { return ({ userId: userId, groupId: groupId }); });
                        return [4 /*yield*/, user_group_model_definition_1.UserGroup.bulkCreate(userGroupRelations, { transaction: t })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, t.commit()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        error_1 = _a.sent();
                        return [4 /*yield*/, t.rollback()];
                    case 7:
                        _a.sent();
                        throw error_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return GroupsService;
}());
exports.GroupsService = GroupsService;