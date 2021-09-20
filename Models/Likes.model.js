'use strict';
import {Model, DataTypes} from 'sequelize';
import sequelize from '../Config/database';
import User from './User.model';
import Post from './Posts.model';

class Likes extends Model {
}

Likes.init({
    typeActionPostComment: DataTypes.STRING,
    postId: DataTypes.STRING,
    userPhoneEmail: DataTypes.STRING,
    likeDislike: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'likes',
});

Likes.belongsTo(User);
Likes.belongsTo(Post, {foreignKey: 'id', targetKey: 'id'});

export default Likes;

