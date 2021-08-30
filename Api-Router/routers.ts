import express from 'express';
import { asyncFunctionWrapper } from '../Helpers/async.function.wrapper';
import imageUpload from '../Helpers/upload.setting.for.image';
import UserController from './Users/class.user.controller';
import UserService from '../Service/Users/users.service.functional';
import PostController from './Posts/class.posts.controller';
import PostsService from '../Service/Posts/posts.service.data';

const apiRouter = express.Router();
const userServices = new UserService();
const classUserController = new UserController(userServices);
const postServices = new PostsService();
const classPostController = new PostController(postServices);


const userRoutes = express.Router();

userRoutes.delete('/email-verification', asyncFunctionWrapper(classUserController.deleteUser));


apiRouter.use('/user', userRoutes);


// Authorization
apiRouter.post('/registration', asyncFunctionWrapper(classUserController.registration));
apiRouter.post('/login', asyncFunctionWrapper(classUserController.login));
apiRouter.get('/logout', asyncFunctionWrapper(classUserController.logout));
apiRouter.post('/password-update', asyncFunctionWrapper(classUserController.passwordUpdate));

apiRouter.post('/delete-user-by-admin', asyncFunctionWrapper(classUserController.deleteUserByAdmin));

// Posts
apiRouter.post('/new-post', imageUpload.single('image'), asyncFunctionWrapper(classPostController.newPost));
apiRouter.get('/posts', asyncFunctionWrapper(classPostController.getPosts));
apiRouter.get('/posts/:id', asyncFunctionWrapper(classPostController.getPostsId));
apiRouter.post('/new-comment', asyncFunctionWrapper(classPostController.newComment));
apiRouter.post('/new-like', asyncFunctionWrapper(classPostController.newLike));
apiRouter.delete('/delete-post/:id', asyncFunctionWrapper(classPostController.deletePost));
apiRouter.delete('/delete-comment/:id', asyncFunctionWrapper(classPostController.deleteComment));

export default apiRouter;
