import { Model, DataTypes } from 'sequelize';
import sequelize from '../Config/database';

class Post extends Model {}

Post.init({
  phoneEmail: {
    type: DataTypes.STRING,
    unique: false,
  },
  title: {
    type: DataTypes.STRING,
    unique: false,
  },
  body: {
    type: DataTypes.STRING,
    unique: false,
  },
  image: {
    type: DataTypes.STRING,
    unique: false,
  },
  countLikes: {
    type: DataTypes.STRING,
    unique: false,
  },
  countComments: {
    type: DataTypes.STRING,
    unique: false,
  },
}, {
  sequelize,
  modelName: 'posts',
});

export default Post;
