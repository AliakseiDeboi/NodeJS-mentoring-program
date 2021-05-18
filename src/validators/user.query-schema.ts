import * as Joi from '@hapi/joi';

export const getUsersQuerySchema = Joi.object({
    loginSubstring: Joi.string().optional(),
    limit: Joi.number().optional()
});
