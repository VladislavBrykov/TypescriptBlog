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
const incoming_data_validator_1 = require("../../Helpers/incoming.data.validator");
database_1.default.sync({ force: true }).then(() => console.log('database created and ready to work'));
let UserController = class UserController {
    constructor(userService) {
        this.registration = async (req, res) => {
            const { password, phoneEmail } = req.body;
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.body);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const resRegistration = await this._userService.userService.serviceRegistration(phoneEmail, password);
            return resRegistration
                ? res.status(200)
                    .json({ status: 'registration successful' })
                : res.status(404)
                    .json({ status: 'registration error, user exists' });
        };
        this.login = async (req, res) => {
            const { password, phoneEmail } = req.body;
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.body);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const resLogin = await this._userService.userService.serviceLogin(phoneEmail, password);
            return resLogin
                ? res.status(200).json({ resLogin })
                : res.status(401).json({ status: 'Invalid username or password' });
        };
        this.logout = async (req, res) => {
            const token = req.headers.authorization;
            let authorizationToken = {
                authorization: req.headers.authorization
            };
            const incomingDataValid = await incoming_data_validator_1.schema.validate(authorizationToken);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const { all } = req.query;
            const resLogout = await this._userService.userService.serviceLogout(token, all.toString());
            return resLogout
                ? res.status(200).json({ status: true })
                : res.status(401).json({ status: 'token error' });
        };
        this.deleteUser = async (req, res) => {
            const token = req.headers.authorization;
            let authorizationToken = {
                authorization: req.headers.authorization
            };
            const incomingDataValid = await incoming_data_validator_1.schema.validate(authorizationToken);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const resLogout = await this._userService.userService.serviceDeleteUser(token);
            return resLogout
                ? res.status(200).json({ status: true })
                : res.status(403).json({ status: 'you can\'t logout' });
        };
        this.deleteUserByAdmin = async (req, res) => {
            const { username } = req.body;
            let authorizationToken = {
                authorization: req.headers.authorization
            };
            const incomingDataValid = await incoming_data_validator_1.schema.validate(authorizationToken, req.body);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const resLogout = await this._userService.userService.serviceDeleteUserByAdmin(username);
            return resLogout
                ? res.status(200).json({ status: true })
                : res.status(401).json({ status: 'token error' });
        };
        this.passwordUpdate = async (req, res) => {
            const { password, phoneEmail, newPassword } = req.body;
            const token = req.headers.authorization;
            let authorizationToken = {
                authorization: req.headers.authorization
            };
            const incomingDataValid = await incoming_data_validator_1.schema.validate(authorizationToken, req.body);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            if (await search_user_service_1.default.searchUserService(token) === false) {
                return res.status(403).json({ error: 'not enough rights' });
            }
            const loginedUser = await this._userService.userService.servicePasswordUpdate(phoneEmail, password, newPassword, token);
            return loginedUser.status === true
                ? res.status(200).json({ login: 'success', loginedUser })
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