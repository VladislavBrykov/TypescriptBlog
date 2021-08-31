"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../Config/database"));
// https://sequelize.org/master/manual/assocs.html
class Likes extends sequelize_1.Model {
}
Likes.init({
    typeActionPostComment: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    idPostComment: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    phoneEmail: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    likeDislike: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'likes',
});
exports.default = Likes;
//# sourceMappingURL=Likes.model.js.map