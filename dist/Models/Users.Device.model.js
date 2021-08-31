"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../Config/database"));
class UserDevice extends sequelize_1.Model {
}
UserDevice.init({
    phoneEmail: {
        type: sequelize_1.DataTypes.STRING,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: 'devices',
});
exports.default = UserDevice;
//# sourceMappingURL=Users.Device.model.js.map