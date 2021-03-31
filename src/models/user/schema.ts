import * as Joi from '@hapi/joi';

/**
 * This schema contains rules that would be applied to params while creating user.
 */
export const createUserSchema = Joi.object({
    login: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean()
});

/**
 * This schema contains rules that would be applied to params while updating user.
 */
export const updateUserSchema = Joi.object({
    login: Joi.string().alphanum().optional(),
    password: Joi.string().alphanum().optional(),
    age: Joi.number().min(4).max(130).optional(),
    isDeleted: Joi.boolean().optional()
});

/**
 * This schema contains rules that would be applied to params while getting user by login.
 */
export const getUsersQuerySchema = Joi.object({
    loginSubstring: Joi.string().optional(),
    limit: Joi.number().optional()
});
