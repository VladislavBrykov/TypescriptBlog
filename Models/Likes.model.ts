import {Model, DataTypes} from 'sequelize';
import sequelize from '../Config/database';
import User from './User.model';
import Post from './Posts.model';

class Likes extends Model {
}

Likes.init({
  typeActionPostComment: {
    type: DataTypes.STRING,
    unique: false,
  },
  postId: {
    type: DataTypes.STRING,
    unique: false,
  },
  userPhoneEmail: {
    type: DataTypes.STRING,
    unique: false,
  },
  likeDislike: {
    type: DataTypes.STRING,
    unique: false,
  },
}, {
  sequelize,
  modelName: 'likes',
});

Likes.belongsTo(User);
Likes.belongsTo(Post, {foreignKey: 'id', targetKey: 'id'});

export default Likes;
