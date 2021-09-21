'use strict';
import {Model, DataTypes} from 'sequelize';
import sequelize from '../Config/database';
import User from './User.model';

  class Post extends Model {};
  Post.init({
    userPhoneEmail: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    image: DataTypes.STRING,
    countLikes: DataTypes.STRING,
    countDisLikes: DataTypes.STRING,
    countComments: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'posts',
  });

Post.belongsTo(User, {foreignKey: 'phoneEmail', targetKey: 'phoneEmail'});

export default Post;
