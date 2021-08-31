const Joi = require('joi');

export const schema = Joi.object({

    typeAction: Joi.string().valid('post', 'comment'),

    typeActionPostComment: Joi.string().valid('post', 'comment'),

    likeDislike: Joi.string().valid('like', 'dislike'),

    idPostComment: Joi.number()
        .min(1)
        .max(10000),

    comment: Joi.string()
        .min(1)
        .max(300),

    id: Joi.number()
        .min(1)
        .max(10000),

    page: Joi.string()
        .min(1)
        .max(1000),

    sort: Joi.string().valid('standard', 'reverse'),

    phoneEmail: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    newPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    title: Joi.string()
        .min(10)
        .max(300),

    body: Joi.string()
        .min(10)
        .max(3000),

    authorization: [
        Joi.string(),
        Joi.number()
    ],
})

