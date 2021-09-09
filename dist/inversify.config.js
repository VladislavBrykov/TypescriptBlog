"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const inversify_1 = require("inversify");
const types_1 = require("./types");
const users_service_functional_1 = __importDefault(require("./Service/Users/users.service.functional"));
const posts_service_data_1 = __importDefault(require("./Service/Posts/posts.service.data"));
const myContainer = new inversify_1.Container();
myContainer.bind(types_1.TYPES.Users).to(users_service_functional_1.default);
myContainer.bind(types_1.TYPES.Posts).to(posts_service_data_1.default);
const userService = myContainer.get(types_1.TYPES.Users);
const postService = myContainer.get(types_1.TYPES.Posts);
module.exports = { myContainer, userService, postService };
//# sourceMappingURL=inversify.config.js.map