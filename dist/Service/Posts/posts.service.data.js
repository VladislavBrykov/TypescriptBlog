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
const Comments_model_1 = __importDefault(require("../../Models/Comments.model"));
const Likes_model_1 = __importDefault(require("../../Models/Likes.model"));
const Posts_model_1 = __importDefault(require("../../Models/Posts.model"));
const Users_Device_model_1 = __importDefault(require("../../Models/Users.Device.model"));
const create_new_token_1 = __importDefault(require("../Users/utils/create.new.token"));
const search_user_service_1 = __importDefault(require("../Users/utils/search.user.service"));
const searchLikeDislike_1 = __importDefault(require("./utils/searchLikeDislike"));
const updateCountComments_1 = __importDefault(require("./utils/updateCountComments"));
const updateCountLikes_1 = __importDefault(require("./utils/updateCountLikes"));
let PostService = class PostService {
    constructor() {
    }
    async uploadImage(id, image) {
        await Posts_model_1.default.update({ image }, { where: { id } });
        return image;
    }
    async newPost(title, body, username) {
        const valueCreateNewPost = {
            title,
            body,
            userPhoneEmail: username,
            countLikes: 0,
            countDisLikes: 0,
            countComments: 0,
        };
        await Posts_model_1.default.create(valueCreateNewPost);
        const bodyCreateNewPost = await Posts_model_1.default.findAll({ where: { title, body }, });
        const resultCreateNewPost = {
            bodyCreateNewPost,
        };
        return resultCreateNewPost;
    }
    async getPosts(page, sort) {
        const startIdPost = (page - 1) * 15;
        if (sort === 'ASC') {
            return Posts_model_1.default.findAll({
                offset: startIdPost,
                limit: 15,
            });
        }
        const posts = await Posts_model_1.default.findAll({
            offset: startIdPost,
            limit: 15,
            order: [['id', 'DESC']],
        });
        return { posts };
    }
    async newComment(typeAction, id, token, comment) {
        const username = await search_user_service_1.default.searchUserService(token);
        const createNewComment = {
            typeAction,
            userPhoneEmail: username,
            postId: id.toString(),
            bodyComment: comment,
        };
        await Comments_model_1.default.create(createNewComment);
        await updateCountComments_1.default(1, id);
        return {
            createNewComment,
            success: 'comment create',
        };
    }
    async newLike(typeActionPostComment, postId, newToken, userPhoneEmail, likeDislike) {
        if (!await searchLikeDislike_1.default(postId, userPhoneEmail, likeDislike, typeActionPostComment)) {
            await Likes_model_1.default.destroy({
                where: {
                    userPhoneEmail, typeActionPostComment, idPostComment: postId.toString(), likeDislike,
                },
            });
            await updateCountLikes_1.default(-1, postId, likeDislike);
            return { true: `${likeDislike} exists and be deleted` };
        }
        const createNewLIke = {
            typeActionPostComment,
            postId,
            userPhoneEmail,
            likeDislike,
        };
        await Likes_model_1.default.create(createNewLIke);
        await updateCountLikes_1.default(1, postId, likeDislike);
        return { true: `${likeDislike} create` };
    }
    async deletePost(token, postId) {
        await Posts_model_1.default.destroy({ where: { id: postId } });
        const username = await search_user_service_1.default.searchUserService(token);
        const newToken = create_new_token_1.default.newTokenCreator(username);
        await Users_Device_model_1.default.update({ token: newToken }, { where: { token } });
        return { status: 'true', newToken };
    }
    async deleteComment(token, commentId) {
        await Comments_model_1.default.destroy({ where: { idToDo: commentId.toString() } });
        const username = await search_user_service_1.default.searchUserService(token);
        const newToken = create_new_token_1.default.newTokenCreator(username);
        await Users_Device_model_1.default.update({ token: newToken }, { where: { token } });
        await updateCountComments_1.default(-1, commentId);
        return { status: 'true', newToken };
    }
    async getPostById(postId) {
        const post = await Posts_model_1.default.findAll({
            where: { id: postId },
        });
        return { post };
    }
    async getPostCommentsLikesById(postId) {
        const likes = await Likes_model_1.default.findAll({
            where: {
                postId: postId.toString(),
                likeDislike: 'like'
            },
        });
        const dislikes = await Likes_model_1.default.findAll({
            where: {
                postId: postId.toString(),
                likeDislike: 'dislike'
            },
        });
        const comments = await Comments_model_1.default.findAll({
            where: { postId: postId.toString() },
        });
        return { likes, dislikes, comments };
    }
};
PostService = __decorate([
    inversify_1.injectable()
], PostService);
exports.default = PostService;
//# sourceMappingURL=posts.service.data.js.map