"use strict";
// const Joi = require('joi');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object({
    typeAction: joi_1.default.string().valid('post', 'comment'),
    typeActionPostComment: joi_1.default.string().valid('post', 'comment'),
    likeDislike: joi_1.default.string().valid('like', 'dislike'),
    idPostComment: joi_1.default.number()
        .min(1)
        .max(10000),
    comment: joi_1.default.string()
        .min(1)
        .max(300),
    id: joi_1.default.number()
        .min(1)
        .max(10000),
    page: joi_1.default.string()
        .min(1)
        .max(1000),
    sort: joi_1.default.string().valid('standard', 'reverse'),
    phoneEmail: joi_1.default.string()
        .min(3)
        .max(30),
    username: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    newPassword: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    title: joi_1.default.string()
        .min(10)
        .max(300),
    body: joi_1.default.string()
        .min(10)
        .max(3000),
    authorization: [
        joi_1.default.string(),
        joi_1.default.number(),
    ],
});
//# sourceMappingURL=incoming.data.validator.js.map