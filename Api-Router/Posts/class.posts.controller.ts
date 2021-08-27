import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import idCommentValidator from '../../Service/Posts/utils/searchIdComment';
import idPostValidator from '../../Service/Posts/utils/searchIdPost';
import { TYPES } from '../../types';
import functionHelpers from '../../Service/Users/utils/user.service.helpers';
import 'reflect-metadata';
import PostService from '../../Service/Posts/posts.service.data';
import imageRenameForIdUser from '../../Helpers/rename.image';
import {
  postValidator, pageSortValidator, tokenValidator, commentValidator, likeValidator,
} from '../../Helpers/incoming.data.validator';

@injectable()
class PostController {
  private _postService: PostService;

  constructor(@inject(TYPES.Posts) postService: PostService) {
    this._postService = postService;
  }

  newPost = async (req: Request, res: Response) => {
    const { title, body, username } = req.body;
    const image = req.file;
    const token: string = req.headers.authorization;

    const reqBodyValid = await postValidator(title, body, username, image, token);
    if (reqBodyValid.status === false) {
      return res.status(401).json({ error: reqBodyValid });
    }

    const newImageName = imageRenameForIdUser(image.filename);
    const createNewPost: any = await this._postService.serviceNewPost(
      title,
      body,
      token,
      newImageName,
      username,
    );
    return res.status(200).json({ createNewPost, status: 'new post is create' });
  }

  getPosts = async (req: Request, res: Response) => {
    const { page } = req.query;
    const { sort } = req.query;
    const reqBodyValid = await pageSortValidator(page, sort);
    if (reqBodyValid.status === false) {
      return res.status(401).json({ error: reqBodyValid });
    }
    const allPosts: any = await this._postService.serviceGetPosts(Number(page), sort.toString());

    return res.status(200).json({ allPosts });
  }

  getPostsId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const correctPostId = await idPostValidator(Number(id));

    if (correctPostId === false) {
      return res.status(401).json({ error: correctPostId });
    }
    const postIdInformation: any = await this._postService.serviceGetPostsId(Number(id.toString()));
    return res.status(200).json({ postIdInformation });
  }

  newComment = async (req: Request, res: Response) => {
    const { typeAction, id, comment } = req.body;
    const token: string = req.headers.authorization;

    const reqCommentValid = await commentValidator(typeAction, id, comment, token);
    if (reqCommentValid.status === false) {
      return res.status(401).json({ error: reqCommentValid });
    }

    const createNewComment: any = await this._postService.serviceNewComment(
      typeAction,
      id,
      token,
      comment,
    );
    return res.status(200).json({ status: 'new comment is create', createNewComment });
  }

  newLike = async (req: Request, res: Response) => {
    const {
      typeActionPostComment,
      idPostComment,
      phoneEmail,
      likeDislike,
    } = req.body;
    const token: string = req.headers.authorization;

    const reqLikeValid = await likeValidator(
      typeActionPostComment,
      idPostComment,
      phoneEmail,
      likeDislike,
    );
    if (reqLikeValid.status === false) {
      return res.status(401).json({ error: reqLikeValid });
    }
    if (await functionHelpers.searchUserService(token) === false) {
      return res.status(405).json({ error: 'not enough rights' });
    }
    const resultCreateNewLike = await this._postService.serviceNewLike(
      typeActionPostComment,
      idPostComment,
      token,
      phoneEmail,
      likeDislike,
    );
    return res.status(200).json({ resultCreateNewLike });
  }

  deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const token: string = req.headers.authorization;
    const reqTokenValid = await tokenValidator(token);
    const validIdPosts = await idPostValidator(Number(id.toString()));
    if (validIdPosts === false) {
      return res.status(405).json({ status: 'post with this id dont exists' });
    }

    if (reqTokenValid.status === false) {
      return res.status(401).json({ error: reqTokenValid });
    }
    if (await functionHelpers.searchUserService(token) === false) {
      return res.status(405).json({ error: 'not enough rights' });
    }

    const deletedPost = await this._postService.serviceDeletePost(token, Number(id.toString()));
    if (deletedPost) {
      return res.status(200).json({ deletedPost });
    }
    return res.status(405).json({ status: 'you can\'t deleted this post' });
  }

  deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const token: string = req.headers.authorization;
    const validIdComment = await idCommentValidator(Number(id));
    const reqTokenValid = await tokenValidator(token);
    if (reqTokenValid.status === false) {
      return res.status(401).json({ error: reqTokenValid });
    }
    if (await functionHelpers.searchUserService(token) === false) {
      return res.status(405).json({ error: 'not enough rights' });
    }

    const deletedComment = await this._postService.serviceDeleteComment(token, Number(id));
    if (deletedComment) {
      return res.status(200).json({ status: 'comment be deleted', deletedComment });
    }
    return res.status(405).json({ status: 'you can\'t deleted this post' });
  }
}

export default PostController;
