import {Container} from 'inversify';
import {TYPES} from './types';
import {Users, Posts} from './interfaces';
import UserService from './Service/Users/users.service.functional';
import PostService from './Service/Posts/posts.service.data';

const myContainer = new Container();
myContainer.bind<Users>(TYPES.Users).to(UserService);
myContainer.bind<Posts>(TYPES.Posts).to(PostService);

const userService = myContainer.get<Users>(TYPES.Users);
const postService = myContainer.get<Posts>(TYPES.Posts);

export = {myContainer, userService, postService};
