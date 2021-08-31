import express from 'express';
import { asyncFunctionWrapper } from '../Helpers/async.function.wrapper';
import imageUpload from '../Helpers/upload.setting.for.image';
import UserController from './Users/class.user.controller';
import PostController from './Posts/class.posts.controller';
import userService from '../inversify.config'
import postService from '../inversify.config'

const apiRouter = express.Router();
const classUserController = new UserController(userService);
const classPostController = new PostController(postService);

//Admin
apiRouter.post('/delete-user-by-admin', asyncFunctionWrapper(classUserController.deleteUserByAdmin));
apiRouter.delete('/delete-post/:id', asyncFunctionWrapper(classPostController.deletePost));

// Authorization
apiRouter.post('/registration', asyncFunctionWrapper(classUserController.registration));
apiRouter.post('/login', asyncFunctionWrapper(classUserController.login));
apiRouter.get('/logout', asyncFunctionWrapper(classUserController.logout));
apiRouter.post('/password-update', asyncFunctionWrapper(classUserController.passwordUpdate));
apiRouter.delete('/delete-user', asyncFunctionWrapper(classUserController.deleteUser));


// Posts
apiRouter.post('/new-post', imageUpload.single('image'), asyncFunctionWrapper(classPostController.newPost));
apiRouter.get('/posts', asyncFunctionWrapper(classPostController.getPosts));
apiRouter.get('/posts/:id', asyncFunctionWrapper(classPostController.getPostId));
apiRouter.get('/post-comments-likes/:id', asyncFunctionWrapper(classPostController.getPostCommentsLikesId));
apiRouter.post('/new-comment', asyncFunctionWrapper(classPostController.newComment));
apiRouter.post('/new-like', asyncFunctionWrapper(classPostController.newLike));
apiRouter.delete('/delete-comment/:id', asyncFunctionWrapper(classPostController.deleteComment));

export default apiRouter;
