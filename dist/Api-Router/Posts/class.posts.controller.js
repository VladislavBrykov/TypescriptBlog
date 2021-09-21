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
const rename_image_1 = __importDefault(require("../../Helpers/rename.image"));
const incoming_data_validator_1 = __importDefault(require("../../Helpers/incoming.data.validator"));
let PostController = class PostController {
    constructor(postService) {
        this.uploadImage = async (req, res) => {
            const img = req.file;
            const { id } = req.params;
            const newImageName = rename_image_1.default(img.filename);
            const uploadImage = await this.capacityPost.postService.uploadImage(id, newImageName);
            if (!uploadImage) {
                throw new Error('new post is not create');
            }
            return res.status(200).json({ uploadImage, status: 'new post is create' });
        };
        this.newPost = async (req, res) => {
            const { title, body, user, newToken } = req.body;
            await incoming_data_validator_1.default.newPostInputData(req.body);
            const createPost = await this.capacityPost.postService.newPost(title, body, user);
            if (!createPost) {
                throw new Error('new post is not create');
            }
            return res.status(200).json({ createPost, status: 'new post is create', newToken });
        };
        this.getPosts = async (req, res) => {
            const { page, sort } = req.query;
            await incoming_data_validator_1.default.getPostsInputData(req.query);
            const allPosts = await this.capacityPost.postService.getPosts(Number(page), sort.toString());
            if (!allPosts) {
                throw new Error('posts not exists');
            }
            return res.status(200).json({ allPosts });
        };
        this.getPostId = async (req, res) => {
            const { id } = req.params;
            await incoming_data_validator_1.default.idInputData(req.params);
            const informationByPostId = await this.capacityPost.postService.getPostById(Number(id.toString()));
            if (!informationByPostId) {
                throw new Error('you can\'t see this post');
            }
            return res.status(200).json({ informationByPostId });
        };
        this.getReactionsById = async (req, res) => {
            const { id } = req.params;
            await incoming_data_validator_1.default.idInputData(req.params);
            const reactionByPostId = await this.capacityPost.postService.getPostCommentsLikesById(Number(id.toString()));
            if (!reactionByPostId) {
                throw new Error('you can\'t see this post');
            }
            return res.status(200).json({ reactionByPostId });
        };
        this.newComment = async (req, res) => {
            const { typeAction, id, comment, newToken } = req.body;
            await incoming_data_validator_1.default.newCommentInputData(req.params);
            const createСomment = await this.capacityPost.postService.newComment(typeAction, id, newToken, comment);
            if (!createСomment) {
                throw new Error('you can\'t create new comment');
            }
            return res.status(200).json({ status: 'new comment is create', createСomment, newToken });
        };
        this.newLike = async (req, res) => {
            const { typeActionPostComment, idPostComment, phoneEmail, likeDislike, newToken, } = req.body;
            await incoming_data_validator_1.default.newLikeInputData(req.params);
            const createLike = await this.capacityPost.postService.newLike(typeActionPostComment, idPostComment, newToken, phoneEmail, likeDislike);
            if (!createLike) {
                throw new Error('you can\'t create new like or dislike');
            }
            return res.status(200).json({ createLike, newToken });
        };
        this.deletePost = async (req, res) => {
            const { newToken } = req.body;
            const { id } = req.params;
            await incoming_data_validator_1.default.idInputData(req.params);
            const deletedPost = await this.capacityPost.postService.deletePost(newToken, Number(id.toString()));
            if (!deletedPost) {
                throw new Error('you can\'t deleted this post');
            }
            return res.status(200).json({ deletedPost });
        };
        this.deleteComment = async (req, res) => {
            const { newToken } = req.body;
            const { id } = req.params;
            await incoming_data_validator_1.default.idInputData(req.params);
            const deletedComment = await this.capacityPost.postService.deleteComment(newToken, Number(id));
            if (!deletedComment) {
                throw new Error('you can\'t deleted this comment');
            }
            return res.status(200).json({ status: 'comment be deleted', newToken });
        };
        this.capacityPost = postService;
    }
};
PostController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Posts))
], PostController);
exports.default = PostController;
//# sourceMappingURL=class.posts.controller.js.map