import { Container } from 'inversify';
import { TYPES } from './types';
import { Users, Posts } from './interfaces';
import UserService from './Service/Users/users.servece.functional';
import PostService from './Service/Posts/posts.servece.data';

const myContainer = new Container();
myContainer.bind<Users>(TYPES.Users).to(UserService);
myContainer.bind<Posts>(TYPES.Posts).to(PostService);

export { myContainer };
