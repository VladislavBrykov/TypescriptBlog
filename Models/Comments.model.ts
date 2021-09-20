import {Model, DataTypes} from 'sequelize';
import sequelize from '../Config/database';
import User from './User.model';
import Post from './Posts.model';

class Comments extends Model {
}

Comments.init({
  typeAction: {
    type: DataTypes.STRING,
    unique: false,
  },
  userPhoneEmail: {
    type: DataTypes.STRING,
    unique: false,
  },
  postId: {
    type: DataTypes.STRING,
    unique: false,
  },
  bodyComment: {
    type: DataTypes.STRING,
    unique: false,
  },
}, {
  sequelize,
  modelName: 'comments',
});

Comments.belongsTo(Post, {foreignKey: 'id', targetKey: 'id'}); //for example or this or down
Comments.belongsTo(User);


export default Comments;
