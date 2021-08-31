"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../Config/database"));
class Comments extends sequelize_1.Model {
}
Comments.init({
    typeAction: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    phoneEmail: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    postId: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    bodyComment: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'comments',
});
exports.default = Comments;
//# sourceMappingURL=Comments.model.js.map