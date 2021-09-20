"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../Config/database"));
const User_model_1 = __importDefault(require("./User.model"));
const Posts_model_1 = __importDefault(require("./Posts.model"));
class Comments extends sequelize_1.Model {
}
Comments.init({
    typeAction: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
    },
    userPhoneEmail: {
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
Comments.belongsTo(Posts_model_1.default, { foreignKey: 'id', targetKey: 'id' }); //for example or this or down
Comments.belongsTo(User_model_1.default);
exports.default = Comments;
//# sourceMappingURL=Comments.model.js.map