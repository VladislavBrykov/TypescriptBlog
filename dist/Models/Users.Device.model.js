"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../Config/database"));
const User_model_1 = __importDefault(require("./User.model"));
class UserDevice extends sequelize_1.Model {
}
UserDevice.init({
    userPhoneEmail: {
        type: sequelize_1.DataTypes.STRING,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: 'devices',
});
UserDevice.belongsTo(User_model_1.default);
exports.default = UserDevice;
//# sourceMappingURL=Users.Device.model.js.map