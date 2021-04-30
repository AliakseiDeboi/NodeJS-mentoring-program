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
exports.routerUsers = void 0;
var express_1 = __importDefault(require("express"));
var express_joi_validation_1 = require("express-joi-validation");
var user_service_1 = require("../services/user.service");
var user_constants_1 = require("../constants/user.constants");
var user_query_schema_1 = require("../validators/user.query-schema");
exports.routerUsers = express_1["default"].Router();
var validator = express_joi_validation_1.createValidator({ passError: true });
var userService = new user_service_1.UserService();
/**
 * GET HTTP request. First param describes url path,
 * second param - callback function, that shows users. Also it can show us users by login substring
 */
exports.routerUsers.get('/', validator.query(user_query_schema_1.getUsersQuerySchema), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : undefined;
                if (!req.query.loginSubstring) return [3 /*break*/, 2];
                return [4 /*yield*/, userService.getAutoSuggestUsers(req.query.loginSubstring.toString().toLowerCase(), limit)];
            case 1:
                data = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, userService.getAllUsers(limit)];
            case 3:
                data = _a.sent();
                _a.label = 4;
            case 4:
                res.status(200).json(data);
                return [2 /*return*/];
        }
    });
}); });
/**
 * POST HTTP request. First param describes url path,
 * second param - callback function, that allow us to add users
 */
exports.routerUsers.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var login, data, UnhandledPromiseRejectionWarning_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, userService.getAutoSuggestUsers(req.body.login.toLowerCase())];
            case 1:
                login = _a.sent();
                if (!!login.length) return [3 /*break*/, 3];
                return [4 /*yield*/, userService.addUser(req.body)];
            case 2:
                data = _a.sent();
                res.status(200).json(data);
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json(user_constants_1.userExists);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                UnhandledPromiseRejectionWarning_1 = _a.sent();
                res.status(400).json(user_constants_1.requiredFields);
                console.log(UnhandledPromiseRejectionWarning_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * GET HTTP request. First param describes url path,
 * second param - callback function, that allow us to get user by id.
 */
exports.routerUsers.get('/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userService.getUserById(req.params.userId)];
            case 1:
                data = _a.sent();
                if (data) {
                    res.status(200).json(data);
                }
                else {
                    res.status(400).json(user_constants_1.userNotExist);
                }
                return [2 /*return*/];
        }
    });
}); });
/**
 * PUT HTTP request. First param describes url path,
 * second param - callback function, that allow us to update user by id. All fields are
 * optional
 */
exports.routerUsers.put('/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, flag, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userService.getUserById(req.params.userId)];
            case 1:
                user = _a.sent();
                flag = (req.body.id === (user === null || user === void 0 ? void 0 : user.id)) || (!req.body.id);
                if (!(user && flag)) return [3 /*break*/, 4];
                user.id = req.body.id;
                return [4 /*yield*/, userService.updateUser(user, req.body)];
            case 2:
                _a.sent();
                return [4 /*yield*/, userService.getUserById(req.params.userId)];
            case 3:
                data = _a.sent();
                res.status(200).json(data);
                return [3 /*break*/, 5];
            case 4:
                if (flag) {
                    res.status(400).json(user_constants_1.userNotExist);
                }
                else {
                    res.status(400).json(user_constants_1.forbiddenId);
                }
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * DELETE HTTP request. First param describes url path,
 * second param - callback function, that allow us to delete user by id.
 */
exports.routerUsers["delete"]('/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userService.getUserById(req.params.userId)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 4];
                return [4 /*yield*/, userService.getUserById(req.params.userId)];
            case 2:
                data = _a.sent();
                return [4 /*yield*/, userService.deleteUser(req.params.userId)];
            case 3:
                _a.sent();
                res.status(204).json(data);
                return [3 /*break*/, 5];
            case 4:
                res.status(400).json(user_constants_1.userNotExist);
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * GET method for getting certain group for certain user
 */
exports.routerUsers.get('/:userId/with-group', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userService.getUserWithGroup(req.params.userId)];
            case 1:
                data = _a.sent();
                res.status(200).json(data);
                return [2 /*return*/];
        }
    });
}); });
