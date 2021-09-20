'use strict';
import {Model, DataTypes} from 'sequelize';
import sequelize from '../Config/database';
import User from './User.model';
import Post from './Posts.model';

class Comments extends Model {
}

Comments.init({
    typeAction: DataTypes.STRING,
    userPhoneEmail: DataTypes.STRING,
    postId: DataTypes.STRING,
    bodyComment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comments',
});

Comments.belongsTo(Post, {foreignKey: 'id', targetKey: 'id'});
Comments.belongsTo(User);

export default Comments;
