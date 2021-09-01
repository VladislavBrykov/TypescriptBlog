import {Request, Response} from 'express';
import {injectable, inject, Container} from 'inversify';
import {TYPES} from '../../types';
import 'reflect-metadata';
import imageRenameForIdUser from '../../Helpers/rename.image';
import {Posts} from "../../interfaces";
import {schema} from "../../Helpers/incoming.data.validator";
import limitedCheckFactor from "../../Helpers/limitedCheckFactor";
import {next} from "inversify-express-utils";

@injectable()
class PostController {
    private _postService: { myContainer: Container; postService: Posts };

    constructor(@inject(TYPES.Posts) postService: { myContainer: Container; postService: Posts }) {
        this._postService = postService;
    }

    newPost = async (req: Request, res: Response) => {
        const {title, body, username} = req.body;
        const img = req.file;
        const newImageName = imageRenameForIdUser(img.filename);
        const createNewPost: any = await this._postService.postService.serviceNewPost(
            title,
            body, req.headers.authorization,
            newImageName,
            username,
        );
        return res.status(200).json({createNewPost, status: 'new post is create'});
    }

    getPosts = async (req: Request, res: Response) => {
        const {page} = req.query;
        const {sort} = req.query;
        const incomingDataValid = await schema.validate(req.query);
        if (incomingDataValid.error) {
            return res.status(401).json({error: incomingDataValid.error.details});
        }
        const allPosts: any = await this._postService.postService.serviceGetPosts(Number(page), sort.toString());

        return res.status(200).json({allPosts});
    }

    getPostId = async (req: Request, res: Response) => {
        const {id} = req.params;
        const incomingDataValid = await schema.validate(req.params);
        if (incomingDataValid.error) {
            return res.status(401).json({error: incomingDataValid.error.details});
        }
        const postIdInformation: any = await this._postService.postService.getPostById(Number(id.toString()));
        return res.status(200).json({postIdInformation});
    }

    getPostCommentsLikesId = async (req: Request, res: Response) => {
        const {id} = req.params;
        const incomingDataValid = await schema.validate(req.params);
        if (incomingDataValid.error) {
            return res.status(401).json({error: incomingDataValid.error.details});
        }
        const postIdInformation: any = await this._postService.postService.getPostCommentsLikesById(Number(id.toString()));
        return res.status(200).json({postIdInformation});
    }

    newComment = async (req: Request, res: Response) => {
        const {typeAction, id, comment} = req.body;

        const createNewComment: any = await this._postService.postService.serviceNewComment(
            typeAction,
            id,
            req.headers.authorization,
            comment,
        );
        return res.status(200).json({status: 'new comment is create', createNewComment});
    }

    newLike = async (req: Request, res: Response) => {
        const {
            typeActionPostComment,
            idPostComment,
            phoneEmail,
            likeDislike,
        } = req.body;

        const resultCreateNewLike = await this._postService.postService.serviceNewLike(
            typeActionPostComment,
            idPostComment,
            req.headers.authorization,
            phoneEmail,
            likeDislike,
        );
        return res.status(200).json({resultCreateNewLike});
    }

    deletePost = async (req: Request, res: Response) => {
        const deletedPost = await this._postService.postService.serviceDeletePost(
            req.headers.authorization,
            Number(req.params.toString())
        );
        if (deletedPost) {
            return res.status(200).json({deletedPost});
        }
        return res.status(403).json({status: 'you can\'t deleted this post'});
    }

    deleteComment = async (req: Request, res: Response) => {
        const deletedComment = await this._postService.postService.serviceDeleteComment(
            req.headers.authorization,
            Number(req.params)
        );
        if (deletedComment) {
            return res.status(200).json({status: 'comment be deleted', deletedComment});
        }
        return res.status(403).json({status: 'you can\'t deleted this post'});
    }
}

export default PostController;
