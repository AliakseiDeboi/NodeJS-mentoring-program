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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersQuerySchema = exports.updateUserSchema = exports.createUserSchema = void 0;
var Joi = __importStar(require("@hapi/joi"));
/**
 * This schema contains rules that would be applied to params while creating user.
 */
exports.createUserSchema = Joi.object({
    login: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean()
});
/**
 * This schema contains rules that would be applied to params while updating user.
 */
exports.updateUserSchema = Joi.object({
    login: Joi.string().alphanum().optional(),
    password: Joi.string().alphanum().optional(),
    age: Joi.number().min(4).max(130).optional(),
    isDeleted: Joi.boolean().optional()
});
/**
 * This schema contains rules that would be applied to params while getting user by login.
 */
exports.getUsersQuerySchema = Joi.object({
    loginSubstring: Joi.string().optional(),
    limit: Joi.number().optional()
});
