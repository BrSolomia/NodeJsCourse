import Joi from 'joi';

export const userGroupCreateSchema = Joi.object().keys({
    groupId : Joi.string(),
    userIds : Joi.array().items(Joi.string())
});