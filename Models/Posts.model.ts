import {Model, DataTypes} from 'sequelize';
import sequelize from '../Config/database';
import User from './User.model';

class Post extends Model {
}

Post.init({
  userPhoneEmail: {
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
  countDisLikes: {
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

Post.belongsTo(User, {foreignKey: 'phoneEmail', targetKey: 'phoneEmail'});


export default Post;
