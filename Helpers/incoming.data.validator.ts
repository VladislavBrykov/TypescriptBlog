const Joi = require('joi');

async function registrationLoginInputData(body) {
    const schema = Joi.object({
        phoneEmail: Joi.string()
          .min(3)
          .max(30),

        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    });
    const validatorParams = schema.validate(body);
    if (validatorParams.error) {
        throw new Error(schema.validate(body).error.details);
    }
}

async function deleteUserByAdminInputData(body) {
    const schema = Joi.object({
        username: Joi.string()
          .alphanum()
          .min(3)
          .max(30),

        newToken: Joi.string()
          .min(10)
    });
    const validatorParams = schema.validate(body);
    if (validatorParams.error) {
        throw new Error(schema.validate(body).error.details);
    }
}

async function passwordUpdateInputData(body) {
    const schema = Joi.object({
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        newPassword: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        phoneEmail: Joi.string()
          .min(3)
          .max(30),

        newToken: Joi.string()
          .min(10)
    });
    const validatorParams = schema.validate(body);
    if (validatorParams.error) {
        throw new Error(schema.validate(body).error.details);
    }
}

async function newPostInputData(body) {
    const schema = Joi.object({
        title: Joi.string()
          .min(5)
          .max(300),

        body: Joi.string()
          .min(5)
          .max(3000),

        user: Joi.string()
          .min(3)
          .max(30),

        newToken: Joi.string()
          .min(10)
    });
    const validatorParams = schema.validate(body);
    if (validatorParams.error) {
        throw new Error(schema.validate(body).error.details);
    }
}

async function getPostsInputData(body) {
    const schema = Joi.object({
        page: Joi.string()
          .min(1)
          .max(1000),

        sort: Joi.string().valid('standard', 'reverse'),
    });
    const validatorParams = schema.validate(body);
    if (validatorParams.error) {
        throw new Error(schema.validate(body).error.details);
    }
}

async function idInputData(body) {
    const schema = Joi.object({
        id: Joi.number()
          .min(1)
          .max(10000),
    });
    const validatorParams = schema.validate(body);
    if (validatorParams.error) {
        throw new Error(schema.validate(body).error.details);
    }
}

async function newCommentInputData(body) {
    const schema = Joi.object({
        typeAction: Joi.string().valid('post', 'comment'),

        id: Joi.number()
          .min(1)
          .max(10000),

        comment: Joi.string()
          .min(1)
          .max(300),

    });
    const validatorParams = schema.validate(body);
    if (validatorParams.error) {
        throw new Error(schema.validate(body).error.details);
    }
}

async function newLikeInputData(body) {
    const schema = Joi.object({
        typeAction: Joi.string().valid('post', 'comment'),

        idPostComment: Joi.number()
          .min(1)
          .max(10000),

        phoneEmail: Joi.string()
          .min(3)
          .max(30),

        likeDislike: Joi.string().valid('like', 'dislike'),
    });
    const validatorParams = schema.validate(body);
    if (validatorParams.error) {
        throw new Error(schema.validate(body).error.details);
    }
}

const valid = {
    registrationLoginInputData,
    deleteUserByAdminInputData,
    passwordUpdateInputData,
    newPostInputData,
    getPostsInputData,
    idInputData,
    newCommentInputData,
    newLikeInputData,
}

export default valid;
