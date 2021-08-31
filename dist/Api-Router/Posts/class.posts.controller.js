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
const search_user_service_1 = __importDefault(require("../../Service/Users/utils/search.user.service"));
require("reflect-metadata");
const rename_image_1 = __importDefault(require("../../Helpers/rename.image"));
const incoming_data_validator_1 = require("../../Helpers/incoming.data.validator");
let PostController = class PostController {
    constructor(postService) {
        this.newPost = async (req, res) => {
            const { title, body, username } = req.body;
            const img = req.file;
            const authorizationToken = {
                authorization: req.headers.authorization
            };
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.body, authorizationToken);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const newImageName = rename_image_1.default(img.filename);
            const createNewPost = await this._postService.postService.serviceNewPost(title, body, req.headers.authorization, newImageName, username);
            return res.status(200).json({ createNewPost, status: 'new post is create' });
        };
        this.getPosts = async (req, res) => {
            const { page } = req.query;
            const { sort } = req.query;
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.query);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const allPosts = await this._postService.postService.serviceGetPosts(Number(page), sort.toString());
            return res.status(200).json({ allPosts });
        };
        this.getPostId = async (req, res) => {
            const { id } = req.params;
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.params);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const postIdInformation = await this._postService.postService.getPostById(Number(id.toString()));
            return res.status(200).json({ postIdInformation });
        };
        this.getPostCommentsLikesId = async (req, res) => {
            const { id } = req.params;
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.params);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const postIdInformation = await this._postService.postService.getPostCommentsLikesById(Number(id.toString()));
            return res.status(200).json({ postIdInformation });
        };
        this.newComment = async (req, res) => {
            const { typeAction, id, comment } = req.body;
            const authorizationToken = {
                authorization: req.headers.authorization
            };
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.body, authorizationToken);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            const createNewComment = await this._postService.postService.serviceNewComment(typeAction, id, req.headers.authorization, comment);
            return res.status(200).json({ status: 'new comment is create', createNewComment });
        };
        this.newLike = async (req, res) => {
            const { typeActionPostComment, idPostComment, phoneEmail, likeDislike, } = req.body;
            const authorizationToken = {
                authorization: req.headers.authorization
            };
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.body, authorizationToken);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            if (await search_user_service_1.default.searchUserService(req.headers.authorization) === false) {
                return res.status(403).json({ error: 'not enough rights' });
            }
            const resultCreateNewLike = await this._postService.postService.serviceNewLike(typeActionPostComment, idPostComment, req.headers.authorization, phoneEmail, likeDislike);
            return res.status(200).json({ resultCreateNewLike });
        };
        this.deletePost = async (req, res) => {
            const authorizationToken = {
                authorization: req.headers.authorization
            };
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.params, authorizationToken);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            if (await search_user_service_1.default.searchUserService(req.headers.authorization) === false) {
                return res.status(403).json({ error: 'not enough rights' });
            }
            const deletedPost = await this._postService.postService.serviceDeletePost(req.headers.authorization, Number(req.params.toString()));
            if (deletedPost) {
                return res.status(200).json({ deletedPost });
            }
            return res.status(403).json({ status: 'you can\'t deleted this post' });
        };
        this.deleteComment = async (req, res) => {
            const authorizationToken = {
                authorization: req.headers.authorization
            };
            const incomingDataValid = await incoming_data_validator_1.schema.validate(req.params, authorizationToken);
            if (incomingDataValid.error) {
                return res.status(401).json({ error: incomingDataValid.error.details });
            }
            if (await search_user_service_1.default.searchUserService(req.headers.authorization) === false) {
                return res.status(403).json({ error: 'not enough rights' });
            }
            const deletedComment = await this._postService.postService.serviceDeleteComment(req.headers.authorization, Number(req.params));
            if (deletedComment) {
                return res.status(200).json({ status: 'comment be deleted', deletedComment });
            }
            return res.status(403).json({ status: 'you can\'t deleted this post' });
        };
        this._postService = postService;
    }
};
PostController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Posts))
], PostController);
exports.default = PostController;
//# sourceMappingURL=class.posts.controller.js.map