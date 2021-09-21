"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../../types");
require("reflect-metadata");
const database_1 = __importDefault(require("../../Config/database"));
const incoming_data_validator_1 = __importDefault(require("../../Helpers/incoming.data.validator"));
database_1.default.sync({ force: true }).then(() => console.log('database created and ready to work'));
let UserController = class UserController {
    constructor(userService) {
        this.registration = async (req, res) => {
            const { password, phoneEmail } = req.body;
            await incoming_data_validator_1.default.registrationLoginInputData(req.body);
            const registerUser = await this.capacityUser.userService.registration(phoneEmail, password);
            if (!registerUser) {
                throw new Error('User not registered, user exists');
            }
            return res.status(200).json({ status: 'registration successful' });
        };
        this.login = async (req, res) => {
            const { password, phoneEmail } = req.body;
            await incoming_data_validator_1.default.registrationLoginInputData(req.body);
            const loginUser = await this.capacityUser.userService.login(phoneEmail, password);
            if (loginUser[0] === false) {
                throw new Error('Invalid username or password');
            }
            return res.status(200).json({ loginUser });
        };
        this.logout = async (req, res) => {
            const { newToken } = req.body;
            const { all } = req.query;
            const logoutUser = await this.capacityUser.userService.logout(newToken, all.toString());
            if (!logoutUser) {
                throw new Error('token error');
            }
            return res.status(200).json({ status: true });
        };
        this.deleteUser = async (req, res) => {
            const { newToken } = req.body;
            const deleteUser = await this.capacityUser.userService.deleteUser(newToken);
            if (!deleteUser) {
                throw new Error('you can\'t logout');
            }
            return res.status(200).json({ status: true });
        };
        this.deleteUserByAdmin = async (req, res) => {
            const { username, newToken } = req.body;
            await incoming_data_validator_1.default.deleteUserByAdminInputData(req.body);
            const logoutUser = await this.capacityUser.userService.deleteUserByAdmin(username);
            if (!logoutUser) {
                throw new Error('token error');
            }
            return res.status(200).json({ status: true, newToken });
        };
        this.passwordUpdate = async (req, res) => {
            const { password, phoneEmail, newPassword, newToken } = req.body;
            await incoming_data_validator_1.default.passwordUpdateInputData(req.body);
            const updatePass = await this.capacityUser.userService.passwordUpdate(phoneEmail, password, newPassword, newToken);
            if (!updatePass) {
                throw new Error('token error');
            }
            return res.status(200).json({ login: 'success', updatePass, newToken });
        };
        this.capacityUser = userService;
    }
};
UserController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Users))
], UserController);
exports.default = UserController;
//# sourceMappingURL=class.user.controller.js.map