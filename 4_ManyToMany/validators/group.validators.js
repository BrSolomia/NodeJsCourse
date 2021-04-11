import Joi from 'joi';

export const groupCreateSchema = Joi.object().keys({
    id : Joi.string().required(),
    name : Joi.string().required(), 
    permissions : Joi.array().items(Joi.string()).required()
});

export const groupUpdateSchema = Joi.object().keys({
    id : Joi.string(),
    name : Joi.string(), 
    permissions : Joi.array().items(Joi.string())
});