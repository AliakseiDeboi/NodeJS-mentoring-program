import * as Joi from '@hapi/joi';

export const authBodySchema = Joi.object({
    login: Joi.required(),
    password: Joi.required()
});

