import express from 'express';
import { asyncFunctionWrapper } from '../Helpers/async.function.wrapper';
import imageUpload from '../Helpers/upload.setting.for.image';
import UserController from './Users/class.user.controlle';
import UserService from '../Service/Users/users.servece.functional';
import PostController from './Posts/class.posts.controller';
import PostsService from '../Service/Posts/posts.servece.data';

const apiRouter = express.Router();
const userServices = new UserService();
const classUserController = new UserController(userServices);
const postServices = new PostsService();
const classPostController = new PostController(postServices);

// Authorization
apiRouter.post('/registration', asyncFunctionWrapper(classUserController.registration));
apiRouter.post('/login', asyncFunctionWrapper(classUserController.login));
apiRouter.get('/logout', asyncFunctionWrapper(classUserController.logout));
apiRouter.get('/delete-user', asyncFunctionWrapper(classUserController.deleteUser));
apiRouter.post('/password-update', asyncFunctionWrapper(classUserController.passwordUpdate));

// Posts
apiRouter.post('/new-post', imageUpload.single('image'), asyncFunctionWrapper(classPostController.newPost));
apiRouter.get('/posts', asyncFunctionWrapper(classPostController.getPosts));
apiRouter.post('/new-comment', asyncFunctionWrapper(classPostController.newComment));
apiRouter.post('/new-like', asyncFunctionWrapper(classPostController.newLike));

// by admin
apiRouter.post('/delete-post', asyncFunctionWrapper(classPostController.deletePost));
apiRouter.post('/delete-user-by-admin', asyncFunctionWrapper(classUserController.deleteUserByAdmin));

export default apiRouter;
