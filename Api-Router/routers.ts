import express from 'express';
import {asyncFunctionWrapper} from '../Helpers/async.function.wrapper';
import imageUpload from '../Helpers/upload.setting.for.image';
import UserController from './Users/class.user.controller';
import PostController from './Posts/class.posts.controller';
import userService from '../inversify.config'
import postService from '../inversify.config'
import limitedCheckFactor from "../Helpers/limitedCheckFactor";

const apiRouter = express.Router();

const classUserController = new UserController(userService);
const classPostController = new PostController(postService);

apiRouter.post('/delete-user-by-admin', limitedCheckFactor.limitedCheckFactorWithToken, asyncFunctionWrapper(classUserController.deleteUserByAdmin));
apiRouter.delete('/delete-post/:id', asyncFunctionWrapper(classPostController.deletePost));

// Authorization
apiRouter.post('/registration', limitedCheckFactor.limitedCheckFactorWithoutToken, asyncFunctionWrapper(classUserController.registration));
apiRouter.post('/login', limitedCheckFactor.limitedCheckFactorWithoutToken, asyncFunctionWrapper(classUserController.login));
apiRouter.get('/logout',limitedCheckFactor.limitedCheckFactorWithToken , asyncFunctionWrapper(classUserController.logout));
apiRouter.post('/password-update', limitedCheckFactor.limitedCheckFactorWithToken , asyncFunctionWrapper(classUserController.passwordUpdate));
apiRouter.delete('/delete-user', limitedCheckFactor.limitedCheckFactorWithToken, asyncFunctionWrapper(classUserController.deleteUser));

// Posts
apiRouter.post('/new-post', imageUpload.single('image'),limitedCheckFactor.limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.newPost));
apiRouter.get('/posts',  asyncFunctionWrapper(classPostController.getPosts));
apiRouter.get('/posts/:id', asyncFunctionWrapper(classPostController.getPostId));
apiRouter.get('/post-comments-likes/:id', asyncFunctionWrapper(classPostController.getPostCommentsLikesId));
apiRouter.post('/new-comment', limitedCheckFactor.limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.newComment));
apiRouter.post('/new-like', limitedCheckFactor.limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.newLike));
apiRouter.delete('/delete-comment/:id', limitedCheckFactor.limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.deleteComment));

export default apiRouter;
