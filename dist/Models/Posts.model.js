"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../Config/database"));
class Post extends sequelize_1.Model {
}
Post.init({
    phoneEmail: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    body: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    countLikes: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    countDisLikes: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    countComments: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'posts',
});
exports.default = Post;
//# sourceMappingURL=Posts.model.js.map