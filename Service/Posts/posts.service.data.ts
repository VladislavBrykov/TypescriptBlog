import {injectable} from 'inversify';
import {Posts} from '../../interfaces';
import Comments from '../../Models/Comments.model';
import Likes from '../../Models/Likes.model';
import Post from '../../Models/Posts.model';
import UserDevice from '../../Models/Users.Device.model';
import tokenCreator from '../Users/utils/create.new.token';
import functionHelpers from '../Users/utils/search.user.service';
import searchLikeDislikeUser from './utils/searchLikeDislike';
import updateCountComments from './utils/updateCountComments';
import updateCountLikes from './utils/updateCountLikes';

@injectable()
class PostService implements Posts {
    constructor() {
    }

    async uploadImage(
        id: string,
        image: string,
    ): Promise<string> {
        await Post.update({image}, {where: {id}});
        return image;
    }

    async newPost(
        title: string,
        body: string,
        username: string,
    ): Promise<object> {
        const valueCreateNewPost = {
            title,
            body,
            userPhoneEmail: username,
            countLikes: 0,
            countDisLikes: 0,
            countComments: 0,
        };

        await Post.create(valueCreateNewPost);
        const bodyCreateNewPost = await Post.findAll({where: { title, body },});
        const resultCreateNewPost = {
            bodyCreateNewPost,
        };
        return resultCreateNewPost;
    }

    async getPosts(page: number, sort: string): Promise<object> { ///getPost
        const startIdPost: number = (page - 1) * 15;
        if (sort === 'ASC') {
            return Post.findAll({
                offset: startIdPost,
                limit: 15,
            });
        }

        const posts = await Post.findAll({
            offset: startIdPost,
            limit: 15,
            order: [['id', 'DESC']],
        });
        return {posts};
    }

    async newComment(
        typeAction: string,
        id: number,
        token: string,
        comment: string,
    ): Promise<object> {
        const username = await functionHelpers.searchUserService(token);
        const createNewComment = {
            typeAction,
            userPhoneEmail: username,
            postId: id.toString(),
            bodyComment: comment,
        };
        await Comments.create(createNewComment);
        await updateCountComments(1, id);
        return {
            createNewComment,
            success: 'comment create',
        };
    }

    async newLike(
        typeActionPostComment: string,
        postId: number,
        newToken: string,
        userPhoneEmail: string,
        likeDislike: string,
    ): Promise<object> {
        if (!await searchLikeDislikeUser(
            postId,
            userPhoneEmail,
            likeDislike,
            typeActionPostComment,
        )) {
            await Likes.destroy({
                where: {
                    userPhoneEmail, typeActionPostComment, idPostComment: postId.toString(), likeDislike,
                },
            });
            await updateCountLikes(-1, postId, likeDislike);
            return {true: `${likeDislike} exists and be deleted`};
        }
        const createNewLIke = {
            typeActionPostComment,
            postId,
            userPhoneEmail,
            likeDislike,
        };
        await Likes.create(createNewLIke);
        await updateCountLikes(1, postId, likeDislike);
        return {true: `${likeDislike} create`};
    }

    async deletePost(
        token: string,
        postId: number,
    ): Promise<object> {
        await Post.destroy({where: {id: postId}});
        const username = await functionHelpers.searchUserService(token);
        const newToken = tokenCreator.newTokenCreator(username);
        await UserDevice.update({token: newToken}, {where: {token}});
        return {status: 'true', newToken};
    }

    async deleteComment(
        token: string,
        commentId: number,
    ): Promise<object> {
        await Comments.destroy({where: {idToDo: commentId.toString()}});
        const username = await functionHelpers.searchUserService(token);
        const newToken = tokenCreator.newTokenCreator(username);
        await UserDevice.update({token: newToken}, {where: {token}});

        await updateCountComments(-1, commentId);
        return {status: 'true', newToken};
    }

    async getPostById(postId: number): Promise<object> {
        const post = await Post.findAll({
            where: {id: postId},
        });
        return {post};
    }

    async getPostCommentsLikesById(postId: number): Promise<object> {
        const likes = await Likes.findAll({
            where: {
                postId: postId.toString(),
                likeDislike: 'like'
            },
        });
        const dislikes = await Likes.findAll({
            where: {
                postId: postId.toString(),
                likeDislike: 'dislike'
            },
        });
        const comments = await Comments.findAll({
            where: {postId: postId.toString()},
        });
        return {likes, dislikes, comments};
    }
}

export default PostService;
