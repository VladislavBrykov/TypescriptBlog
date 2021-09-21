import {Model, DataTypes} from 'sequelize';
import sequelize from '../Config/database';
import UserDevice from './Users.Device.model';
import Comments from './Comments.model';
import Likes from './Likes.model';
import Post from './Posts.model';

class User extends Model {
}

User.init({
  phoneEmail: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
  },
  typeId: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'user',
});

export default User;
