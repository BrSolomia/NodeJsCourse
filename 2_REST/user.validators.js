import Joi from 'joi';

export const userCreateSchema = Joi.object().keys({
    id : Joi.string().required(),
    login : Joi.string().required(), 
    password : Joi.string().regex(/[a-zA-Z]+\d/).required(),
    age : Joi.number().integer().min(4).max(130).required(), 
    isDeleted : Joi.boolean().required()
});

export const userUpdateSchema = Joi.object().keys({
    id : Joi.string(),
    login : Joi.string(), 
    password : Joi.string().regex(/[a-zA-Z]+\d/),
    age : Joi.number().integer().min(4).max(130), 
    isDeleted : Joi.boolean()
});
