import {Request, Response} from 'express';
import {injectable, inject, Container} from 'inversify';
import {TYPES} from '../../types';
import 'reflect-metadata';
import imageRenameForIdUser from '../../Helpers/rename.image';
import {Posts} from '../../interfaces';
import valid from '../../Helpers/incoming.data.validator';

@injectable()
class PostController {
    private capacityPost: { myContainer: Container; postService: Posts };

    constructor(@inject(TYPES.Posts) postService: { myContainer: Container; postService: Posts }) {
        this.capacityPost = postService;
    }

    uploadImage = async (req: Request, res: Response) => {
        const img = req.file;
        const {id} = req.params;

        const newImageName: string = imageRenameForIdUser(img.filename);
        const uploadImage: Promise<string> = await this.capacityPost.postService.uploadImage(
            id,
            newImageName,
        );

        if (!uploadImage) {
            throw new Error('new post is not create');
        }

        return res.status(200).json({uploadImage, status: 'new post is create'});
    }

    newPost = async (req: Request, res: Response) => {
        const {title, body, user, newToken} = req.body;
        await valid.newPostInputData(req.body);

        const createPost: Promise<object> = await this.capacityPost.postService.newPost(
            title,
            body,
            user,
        );

        if (!createPost) {
            throw new Error('new post is not create');
        }

        return res.status(200).json({createPost, status: 'new post is create', newToken});
    }

    getPosts = async (req: Request, res: Response) => {
        const {page, sort} = req.query;
        await valid.getPostsInputData(req.query);
        const allPosts: Promise<object> = await this.capacityPost.postService.getPosts(Number(page), sort.toString());

        if (!allPosts) {
            throw new Error('posts not exists');
        }

        return res.status(200).json({allPosts});
    }

    getPostId = async (req: Request, res: Response) => {
        const {id} = req.params;
        await valid.idInputData(req.params);

        const informationByPostId: Promise<object> = await this.capacityPost.postService.getPostById(Number(id.toString()));

        if (!informationByPostId) {
            throw new Error('you can\'t see this post');
        }

        return res.status(200).json({informationByPostId});
    }

    getReactionsById = async (req: Request, res: Response) => {
        const {id} = req.params;
        await valid.idInputData(req.params);

        const reactionByPostId: Promise<object> = await this.capacityPost.postService.getPostCommentsLikesById(Number(id.toString()));

        if (!reactionByPostId) {
            throw new Error('you can\'t see this post');
        }

        return res.status(200).json({reactionByPostId});
    }

    newComment = async (req: Request, res: Response) => {
        const {typeAction, id, comment, newToken} = req.body;

        await valid.newCommentInputData(req.params);

        const createСomment: Promise<object> = await this.capacityPost.postService.newComment(
            typeAction,
            id,
            newToken,
            comment,
        );

        if (!createСomment) {
            throw new Error('you can\'t create new comment');
        }
        return res.status(200).json({status: 'new comment is create', createСomment, newToken});
    }

    newLike = async (req: Request, res: Response) => {
        const {
            typeActionPostComment,
            idPostComment,
            phoneEmail,
            likeDislike,
            newToken,
        } = req.body;

        await valid.newLikeInputData(req.params);

        const createLike: Promise<object> = await this.capacityPost.postService.newLike(
            typeActionPostComment,
            idPostComment,
            newToken,
            phoneEmail,
            likeDislike,
        );

        if (!createLike) {
            throw new Error('you can\'t create new like or dislike');
        }
        return res.status(200).json({createLike, newToken});
    }

    deletePost = async (req: Request, res: Response) => {
        const { newToken } = req.body;
        const {id} = req.params;
        await valid.idInputData(req.params);

        const deletedPost: Promise<object> = await this.capacityPost.postService.deletePost(
            newToken,
            Number(id.toString())
        );

        if (!deletedPost) {
            throw new Error('you can\'t deleted this post');
        }
        return res.status(200).json({ deletedPost });
    }

    deleteComment = async (req: Request, res: Response) => {
        const { newToken } = req.body;
        const {id} = req.params;

        await valid.idInputData(req.params);

        const deletedComment: Promise<object> = await this.capacityPost.postService.deleteComment(
            newToken,
            Number(id)
        );

        if (!deletedComment) {
            throw new Error('you can\'t deleted this comment');
        }
        return res.status(200).json({status: 'comment be deleted', newToken});
    }
}

export default PostController;
