"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_Device_model_1 = __importDefault(require("../../../Models/Users.Device.model"));
const user_model_1 = __importDefault(require("../../../Models/user.model"));
const create_new_token_1 = __importDefault(require("./create.new.token"));
function updateTokenUserById(nameObject, newToken, data) {
    nameObject.update({ token: newToken }, {
        where: {
            phoneEmail: data.phoneEmail,
        },
    });
    return true;
}
async function userWithUpdatedToken(token) {
    const { tokenValidator, newTokenCreator } = create_new_token_1.default;
    const data = tokenValidator(token);
    const newToken = newTokenCreator(data.phoneEmail);
    const searchUser = await Users_Device_model_1.default.findOne({ where: { token } });
    if (searchUser) {
        await Promise.all([
            updateTokenUserById(searchUser, newToken, data),
            updateTokenUserById(Users_Device_model_1.default, newToken, data),
        ]);
        return searchUser;
    }
    return false;
}
async function searchUserService(token) {
    const searchUser = await Users_Device_model_1.default.findOne({
        where: { token },
        attributes: ['phoneEmail'],
    });
    if (searchUser) {
        return searchUser.getDataValue('phoneEmail');
    }
    return false;
}
async function searchUserTable(phoneEmail) {
    const searchUser = await user_model_1.default.findOne({ where: { phoneEmail } });
    return (searchUser || false);
}
const functionHelpers = {
    searchUserService,
    userWithUpdatedToken,
    searchUserTable,
};
exports.default = functionHelpers;
//# sourceMappingURL=search.user.service.js.map