"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Users_Device_model_1 = __importDefault(require("../../Models/Users.Device.model"));
const create_new_token_1 = __importDefault(require("./utils/create.new.token"));
const find_out_which_id_1 = __importDefault(require("./utils/find.out.which.id"));
const root_user_1 = __importDefault(require("../Posts/utils/root.user"));
const User_model_1 = __importDefault(require("../../Models/User.model"));
let UserService = class UserService {
    constructor() {
    }
    async login(phoneEmail, password) {
        const searchUser = await User_model_1.default.findOne({
            where: { phoneEmail, password },
            attributes: ['phoneEmail', 'typeId', 'role'],
        });
        if (searchUser) {
            const newToken = create_new_token_1.default.newTokenCreator(phoneEmail);
            const newDevice = {
                userPhoneEmail: searchUser.getDataValue('phoneEmail'),
                token: newToken,
            };
            await Users_Device_model_1.default.create(newDevice);
            return {
                newToken,
                searchUser,
            };
        }
        return { status: false };
    }
    async registration(phoneEmail, password) {
        const typeId = find_out_which_id_1.default(phoneEmail);
        const newToken = create_new_token_1.default.newTokenCreator(phoneEmail);
        const registrationUser = {
            phoneEmail,
            password,
            token: newToken,
            typeId,
            role: 'admin',
        };
        const searchUser = await User_model_1.default.findOne({ where: { phoneEmail } });
        if (searchUser) {
            return false;
        }
        await User_model_1.default.create(registrationUser);
        return true;
    }
    async logout(token, all) {
        const searchUser = await Users_Device_model_1.default.findOne({ where: { token } });
        if (all === 'true') {
            await Users_Device_model_1.default.update({ token: null }, { where: { userPhoneEmail: searchUser.phoneEmail } });
        }
        else {
            await Users_Device_model_1.default.update({ token: null }, { where: { token } });
        }
        return true;
    }
    async deleteUser(token) {
        const searchUser = await Users_Device_model_1.default.findOne({ where: { token } });
        if (searchUser) {
            await Users_Device_model_1.default.destroy({ where: { userPhoneEmail: searchUser.phoneEmail } });
            await User_model_1.default.destroy({ where: { phoneEmail: searchUser.phoneEmail } });
            return true;
        }
        return false;
    }
    async deleteUserByAdmin(phoneEmail) {
        if (await root_user_1.default.userRootById(phoneEmail) === 'admin') {
            await Users_Device_model_1.default.destroy({ where: { userPhoneEmail: phoneEmail } });
            await User_model_1.default.destroy({ where: { phoneEmail } });
            return true;
        }
        return false;
    }
    async passwordUpdate(phoneEmail, password, newPassword, token) {
        const searchUser = User_model_1.default.findOne({ where: { phoneEmail, password } });
        if (searchUser) {
            const newToken = create_new_token_1.default.newTokenCreator(phoneEmail);
            await User_model_1.default.update({ password: newPassword }, { where: { phoneEmail } });
            await Users_Device_model_1.default.update({ token: newToken }, { where: { token } });
            return { status: true, token: newToken };
        }
        return { status: false, error: 'password update error' };
    }
};
UserService = __decorate([
    inversify_1.injectable()
], UserService);
exports.default = UserService;
//# sourceMappingURL=users.service.functional.js.map