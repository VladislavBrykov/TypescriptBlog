import { injectable } from 'inversify';
import { Posts } from '../../interfaces';
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

  async serviceuploadImage(
    id: string,
    image: string,
  ): Promise<any> {
    await Post.update({ image }, { where: { id } });
    return image;
  }

  async serviceNewPost(
    title: string,
    body: string,
    token: string,
    // image: string,
    username: string,
  ): Promise<any> {
    const newToken = tokenCreator.newTokenCreator(username);
    await UserDevice.update({ token: newToken }, { where: { token } });

    const valueCreateNewPost = {
      title,
      body,
      // image,
      phoneEmail: username,
      countLikes: 0,
      countDisLikes: 0,
      countComments: 0,
    };

    await Post.create(valueCreateNewPost);
    const bodyCreateNewPost = await Post.findAll({ where: { title, body } });
    const resultCreateNewPost = {
      bodyCreateNewPost,
      newToken,
    };
    return resultCreateNewPost;
  }

  async serviceGetPosts(page: number, sort: string): Promise<any> { /// getPost
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
    return { posts };
  }

  async serviceNewComment(
    typeAction: string,
    id: number,
    token: string,
    comment: string,
  ): Promise<any> {
    const username = await functionHelpers.searchUserService(token);
    const newToken = tokenCreator.newTokenCreator(username);
    await UserDevice.update({ token: newToken }, { where: { token } });
    const createNewComment = {
      typeAction,
      phoneEmail: username,
      postId: id.toString(),
      bodyComment: comment,
    };
    await Comments.create(createNewComment);
    await updateCountComments(1, id);
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
    const newToken = tokenCreator.newTokenCreator(phoneEmail);
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
      await updateCountLikes(-1, idPostComment, likeDislike);
      return { true: `${likeDislike} exists and be deleted`, newToken };
    }
    const createNewLIke = {
      typeActionPostComment,
      idPostComment,
      phoneEmail,
      likeDislike,
    };
    await Likes.create(createNewLIke);
    await updateCountLikes(1, idPostComment, likeDislike);
    return { true: `${likeDislike} create`, newToken };
  }

  async serviceDeletePost(
    token: string,
    postId: number,
  ): Promise<any> {
    await Post.destroy({ where: { id: postId } });
    const username = await functionHelpers.searchUserService(token);
    const newToken = tokenCreator.newTokenCreator(username);
    await UserDevice.update({ token: newToken }, { where: { token } });

    return { status: 'true', newToken };
  }

  async serviceDeleteComment(
    token: string,
    commentId: number,
  ): Promise<any> {
    await Comments.destroy({ where: { idToDo: commentId.toString() } });
    const username = await functionHelpers.searchUserService(token);
    const newToken = tokenCreator.newTokenCreator(username);
    await UserDevice.update({ token: newToken }, { where: { token } });

    await updateCountComments(-1, commentId);
    return { status: 'true', newToken };
  }

  async getPostById(postId: number): Promise<any> {
    const post = await Post.findAll({
      where: { id: postId },
    });
    return { post };
  }

  async getPostCommentsLikesById(postId: number): Promise<any> {
    const likes = await Likes.findAll({
      where: {
        idPostComment: postId.toString(),
        likeDislike: 'like',
      },
    });
    const dislikes = await Likes.findAll({
      where: {
        idPostComment: postId.toString(),
        likeDislike: 'dislike',
      },
    });
    const comments = await Comments.findAll({
      where: { postId: postId.toString() },
    });
    return { likes, dislikes, comments };
  }
}

export default PostService;
