"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.routerGroups = void 0;
var express_1 = __importDefault(require("express"));
var group_service_1 = require("../services/group.service");
var express_joi_validation_1 = require("express-joi-validation");
var group_constants_1 = require("../constants/group.constants");
var group_schema_1 = require("../validators/group.schema");
exports.routerGroups = express_1["default"].Router();
var validator = express_joi_validation_1.createValidator({ passError: true });
var groupsService = new group_service_1.GroupsService();
/**
 * GET method for groups
 */
exports.routerGroups.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, groupsService.getAllGroups()];
            case 1:
                data = _a.sent();
                res.status(200).json(data);
                return [2 /*return*/];
        }
    });
}); });
/**
 * GET method for certain groupID
 */
exports.routerGroups.get('/:groupId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, groupsService.getGroupById(req.params.groupId)];
            case 1:
                data = _a.sent();
                if (data) {
                    res.status(200).json(data);
                }
                else {
                    res.status(400).json(group_constants_1.requiredFields);
                }
                return [2 /*return*/];
        }
    });
}); });
/**
 * POST method for groups
 */
exports.routerGroups.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, groupsService.addGroup(req.body)];
            case 1:
                data = _a.sent();
                if (data) {
                    res.status(200).json(data);
                }
                else {
                    res.status(400).json(group_constants_1.requiredFields);
                }
                return [2 /*return*/];
        }
    });
}); });
/**
 * POST method for adding users to group
 */
exports.routerGroups.post('/:groupId/add-users', validator.body(group_schema_1.addUsersToGroupBodySchema), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.params.groupId && req.body.userIds)) return [3 /*break*/, 2];
                return [4 /*yield*/, groupsService.addUsersToGroup(parseInt(req.params.groupId, 10), req.body.userIds)];
            case 1:
                _a.sent();
                res.status(200).json(group_constants_1.userWasAdded);
                return [3 /*break*/, 3];
            case 2:
                res.status(400).json(group_constants_1.requiredFields);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * PUT method for updating group
 */
exports.routerGroups.put('/:groupId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var targetGroup, flag, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, groupsService.getGroupById(req.params.groupId)];
            case 1:
                targetGroup = _a.sent();
                flag = (req.body.id === (targetGroup === null || targetGroup === void 0 ? void 0 : targetGroup.id)) || (!req.body.id);
                if (!(targetGroup && flag)) return [3 /*break*/, 4];
                targetGroup.id = req.body.id;
                return [4 /*yield*/, groupsService.updateGroup(targetGroup, req.body)];
            case 2:
                _a.sent();
                return [4 /*yield*/, groupsService.getGroupById(req.params.groupId)];
            case 3:
                data = _a.sent();
                res.status(200).json(data);
                return [3 /*break*/, 5];
            case 4:
                if (flag) {
                    res.status(400).json(group_constants_1.groupNotExist);
                }
                else {
                    res.status(400).json(group_constants_1.forbiddenId);
                }
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * DELETE method for deleting certain group
 */
exports.routerGroups["delete"]('/:groupId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var targetGroup;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, groupsService.getGroupById(req.params.groupId)];
            case 1:
                targetGroup = _a.sent();
                if (!targetGroup) return [3 /*break*/, 4];
                return [4 /*yield*/, groupsService.deleteGroup(targetGroup)];
            case 2:
                _a.sent();
                return [4 /*yield*/, groupsService.getGroupById(req.params.groupId)];
            case 3:
                _a.sent();
                res.status(200).json(targetGroup);
                return [3 /*break*/, 5];
            case 4:
                res.status(400).json(group_constants_1.groupNotExist);
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
