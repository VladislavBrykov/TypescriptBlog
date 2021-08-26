import { injectable } from 'inversify';
import { Posts } from '../../interfaces';
import Comments from '../../Models/Comments.model';
import Likes from '../../Models/Likes.model';
import Post from '../../Models/Posts.model';
import UserDevice from '../../Models/Users.Device.model';
import tokenCreator from '../Users/utils/create.new.token';
import functionHelpers from '../Users/utils/user.service.helpers';
import searchLikeDislikeUser from './utils/searchLikeDislike';

@injectable()
class PostService implements Posts {
  constructor() {
  }

  async serviceNewPost(
    title: string,
    body: string,
    token: string,
    image: string,
    username: string,
  ) :Promise<any> {
    const newToken = tokenCreator.newTokenCreater(username);
    await UserDevice.update({ token: newToken }, { where: { token } });
    const timeInMs = Date.now();

    const bodyCreateNewPost = {
      title,
      body,
      image,
      phoneEmail: username,
      countLikes: 0,
      countComments: 0,
      creationTime: timeInMs.toString(),
      updateTime: timeInMs.toString(),
    };
    const resultCreateNewPost = {
      bodyCreateNewPost,
      newToken,
    };
    await Post.create(bodyCreateNewPost);
    return resultCreateNewPost;
  }

  async serviceGetPosts(page: number, sort: string): Promise<any> {
    const startIdPost: number = (page - 1) * 15;
    if (sort === 'standard') {
      const posts = await Post.findAll({
        offset: startIdPost,
        limit: 15,
      });
      return posts;
    }

    const posts = await Post.findAll({
      offset: startIdPost,
      limit: 15,
      order: [['id', 'DESC']],
    });
    return posts;
  }

  async serviceNewComment(
    typeAction: string,
    id: number,
    token: string,
    comment: string,
  ): Promise<any> {
    const username = await functionHelpers.searchUserService(token);
    const newToken = tokenCreator.newTokenCreater(username);
    await UserDevice.update({ token: newToken }, { where: { token } });
    const createNewComment = {
      typeAction,
      phoneEmail: username,
      idToDo: id.toString(),
      bodyComment: comment,
      creationTime: Date.now().toString(),
      updateTime: Date.now().toString(),
    };
    await Comments.create(createNewComment);

    return {
      createNewComment,
      success: 'comment create',
      newToken,
    };
  }

  async serviceNewLike(
    typeActionPostComment: string,
    idPostComment: number,
    token: string,
    phoneEmail: string,
    likeDislike: string,
  ): Promise<any> {
    const newToken = tokenCreator.newTokenCreater(phoneEmail);
    await UserDevice.update({ token: newToken }, { where: { token } });
    if (!await searchLikeDislikeUser(
      idPostComment,
      phoneEmail,
      likeDislike,
      typeActionPostComment,
    )) {
      await Likes.destroy({
        where: {
          phoneEmail, typeActionPostComment, idPostComment: idPostComment.toString(), likeDislike,
        },
      });
      return { true: `${likeDislike} exists and be deleted`, newToken };
    }
    const createNewLIke = {
      typeActionPostComment,
      idPostComment,
      phoneEmail,
      likeDislike,
    };
    await Likes.create(createNewLIke);
    return { true: `${likeDislike} create`, newToken };
  }

  async serviceDeletePost(
    token: string,
    postId: number,
  ): Promise<any> {
    await Post.destroy({ where: { id: postId } });
    const username = await functionHelpers.searchUserService(token);
    const newToken = tokenCreator.newTokenCreater(username);
    return { status: 'true', newToken };
  }
}

export default PostService;
