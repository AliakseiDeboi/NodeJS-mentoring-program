import * as Joi from '@hapi/joi';

export const addUsersToGroupBodySchema = Joi.object({
    userIds: Joi.array().items(Joi.number()).required()
});
