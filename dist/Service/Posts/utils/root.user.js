"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../../Models/user.model"));
const Users_Device_model_1 = __importDefault(require("../../../Models/Users.Device.model"));
async function userRootByToken(token) {
    const searchUser = await Users_Device_model_1.default.findOne({
        where: { token },
        attributes: ['phoneEmail'],
    });
    if (searchUser) {
        return searchUser.getDataValue('phoneEmail');
    }
    return false;
}
async function userRootById(phoneEmail) {
    const searchUser = await user_model_1.default.findOne({
        where: { phoneEmail },
        attributes: ['role'],
    });
    if (searchUser) {
        return searchUser.getDataValue('role');
    }
    return false;
}
const userRoot = {
    userRootByToken,
    userRootById,
};
exports.default = userRoot;
//# sourceMappingURL=root.user.js.map