import express from 'express';
import {asyncFunctionWrapper} from '../Helpers/async.function.wrapper';
import imageUpload from '../Helpers/upload.setting.for.image';
import UserController from './Users/class.user.controller';
import PostController from './Posts/class.posts.controller';
import userService from '../inversify.config'
import postService from '../inversify.config'
import limitedCheckFactorWithToken from "../Helpers/limitedCheckFactor";

const apiRouter = express.Router();

const classUserController = new UserController(userService);
const classPostController = new PostController(postService);

apiRouter.post('/delete-user-by-admin', limitedCheckFactorWithToken, asyncFunctionWrapper(classUserController.deleteUserByAdmin));
apiRouter.delete('/delete-post/:id', limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.deletePost));

// Authorization
apiRouter.post('/registration', asyncFunctionWrapper(classUserController.registration));
apiRouter.post('/login', asyncFunctionWrapper(classUserController.login));
apiRouter.get('/logout', limitedCheckFactorWithToken, asyncFunctionWrapper(classUserController.logout));
apiRouter.post('/password-update', limitedCheckFactorWithToken, asyncFunctionWrapper(classUserController.passwordUpdate));
apiRouter.delete('/delete-user', limitedCheckFactorWithToken, asyncFunctionWrapper(classUserController.deleteUser));

// Posts
apiRouter.post('/new-post', limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.newPost));
//apiRouter.post('/new-post', imageUpload.single('image'),limitedCheckFactor.limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.newPost));

apiRouter.get('/posts', asyncFunctionWrapper(classPostController.getPosts));
apiRouter.get('/posts/:id', asyncFunctionWrapper(classPostController.getPostId));
apiRouter.get('/post-comments-likes/:id', asyncFunctionWrapper(classPostController.getReactionsById));
apiRouter.post('/new-comment', limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.newComment));
apiRouter.post('/new-like', limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.newLike));
apiRouter.delete('/delete-comment/:id', limitedCheckFactorWithToken, asyncFunctionWrapper(classPostController.deleteComment));

apiRouter.post('/uploud-image/:id', imageUpload.single('image'), asyncFunctionWrapper(classPostController.uploadImage));

export default apiRouter;
