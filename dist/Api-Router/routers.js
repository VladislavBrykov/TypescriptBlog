"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const async_function_wrapper_1 = require("../Helpers/async.function.wrapper");
const upload_setting_for_image_1 = __importDefault(require("../Helpers/upload.setting.for.image"));
const class_user_controller_1 = __importDefault(require("./Users/class.user.controller"));
const class_posts_controller_1 = __importDefault(require("./Posts/class.posts.controller"));
const inversify_config_1 = __importDefault(require("../inversify.config"));
const inversify_config_2 = __importDefault(require("../inversify.config"));
const limitedCheckFactor_1 = __importDefault(require("../Helpers/limitedCheckFactor"));
const apiRouter = express_1.default.Router();
const classUserController = new class_user_controller_1.default(inversify_config_1.default);
const classPostController = new class_posts_controller_1.default(inversify_config_2.default);
apiRouter.post('/delete-user-by-admin', limitedCheckFactor_1.default.limitedCheckFactorWithToken, async_function_wrapper_1.asyncFunctionWrapper(classUserController.deleteUserByAdmin));
apiRouter.delete('/delete-post/:id', async_function_wrapper_1.asyncFunctionWrapper(classPostController.deletePost));
// Authorization
apiRouter.post('/registration', limitedCheckFactor_1.default.limitedCheckFactorWithoutToken, async_function_wrapper_1.asyncFunctionWrapper(classUserController.registration));
apiRouter.post('/login', limitedCheckFactor_1.default.limitedCheckFactorWithoutToken, async_function_wrapper_1.asyncFunctionWrapper(classUserController.login));
apiRouter.get('/logout', limitedCheckFactor_1.default.limitedCheckFactorWithToken, async_function_wrapper_1.asyncFunctionWrapper(classUserController.logout));
apiRouter.post('/password-update', limitedCheckFactor_1.default.limitedCheckFactorWithToken, async_function_wrapper_1.asyncFunctionWrapper(classUserController.passwordUpdate));
apiRouter.delete('/delete-user', limitedCheckFactor_1.default.limitedCheckFactorWithToken, async_function_wrapper_1.asyncFunctionWrapper(classUserController.deleteUser));
// Posts
apiRouter.post('/new-post', limitedCheckFactor_1.default.limitedCheckFactorWithToken, async_function_wrapper_1.asyncFunctionWrapper(classPostController.newPost));
apiRouter.get('/posts', async_function_wrapper_1.asyncFunctionWrapper(classPostController.getPosts));
apiRouter.get('/posts/:id', async_function_wrapper_1.asyncFunctionWrapper(classPostController.getPostId));
apiRouter.get('/post-comments-likes/:id', async_function_wrapper_1.asyncFunctionWrapper(classPostController.getPostCommentsLikesId));
apiRouter.post('/new-comment', limitedCheckFactor_1.default.limitedCheckFactorWithToken, async_function_wrapper_1.asyncFunctionWrapper(classPostController.newComment));
apiRouter.post('/new-like', limitedCheckFactor_1.default.limitedCheckFactorWithToken, async_function_wrapper_1.asyncFunctionWrapper(classPostController.newLike));
apiRouter.delete('/delete-comment/:id', limitedCheckFactor_1.default.limitedCheckFactorWithToken, async_function_wrapper_1.asyncFunctionWrapper(classPostController.deleteComment));
apiRouter.post('/uploud-image/:id', upload_setting_for_image_1.default.single('image'), async_function_wrapper_1.asyncFunctionWrapper(classPostController.uploudImage));
exports.default = apiRouter;
//# sourceMappingURL=routers.js.map