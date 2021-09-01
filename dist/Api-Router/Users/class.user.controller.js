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
const search_user_service_1 = __importDefault(require("../../Service/Users/utils/search.user.service"));
database_1.default.sync({ force: true }).then(() => console.log('database created and ready to work'));
let UserController = class UserController {
    constructor(userService) {
        this.registration = async (req, res) => {
            const { password, phoneEmail } = req.body;
            // await limitedCheckFactor.limitedCheckFactorWithoutToken(req, res);
            const resRegistration = await this._userService.userService.serviceRegistration(phoneEmail, password);
            return resRegistration
                ? res.status(200)
                    .json({ status: 'registration successful' })
                : res.status(404)
                    .json({ status: 'registration error, user exists' });
        };
        this.login = async (req, res) => {
            const { password, phoneEmail } = req.body;
            const loginUser = await this._userService.userService.serviceLogin(phoneEmail, password);
            return loginUser
                ? res.status(200).json({ loginUser })
                : res.status(401).json({ status: 'Invalid username or password' });
        };
        this.logout = async (req, res) => {
            const token = req.headers.authorization;
            const { all } = req.query;
            const logoutUser = await this._userService.userService.serviceLogout(token, all.toString());
            return logoutUser
                ? res.status(200).json({ status: true })
                : res.status(401).json({ status: 'token error' });
        };
        this.deleteUser = async (req, res) => {
            const token = req.headers.authorization;
            const logoutUser = await this._userService.userService.serviceDeleteUser(token);
            return logoutUser
                ? res.status(200).json({ status: true })
                : res.status(403).json({ status: 'you can\'t logout' });
        };
        this.deleteUserByAdmin = async (req, res) => {
            const { username } = req.body;
            const logoutUser = await this._userService.userService.serviceDeleteUserByAdmin(username);
            return logoutUser
                ? res.status(200).json({ status: true })
                : res.status(401).json({ status: 'token error' });
        };
        this.passwordUpdate = async (req, res) => {
            const { password, phoneEmail, newPassword } = req.body;
            const token = req.headers.authorization;
            if (await search_user_service_1.default.searchUserService(token) === false) {
                return res.status(403).json({ error: 'not enough rights' });
            }
            const loginUser = await this._userService.userService.servicePasswordUpdate(phoneEmail, password, newPassword, token);
            return loginUser.status === true
                ? res.status(200).json({ login: 'success', loginUser })
                : res.status(403).json({ status: 'login error' });
        };
        this._userService = userService;
    }
};
UserController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Users))
], UserController);
exports.default = UserController;
//# sourceMappingURL=class.user.controller.js.map