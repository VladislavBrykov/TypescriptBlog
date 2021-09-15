import { Model, DataTypes } from 'sequelize';
import sequelize from '../Config/database';

// https://sequelize.org/master/manual/assocs.html
class Likes extends Model {
}

Likes.init({
  typeActionPostComment: {
    type: DataTypes.STRING,
    unique: false,
  },
  idPostComment: {
    type: DataTypes.STRING,
    unique: false,
  },
  phoneEmail: {
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

export default Likes;
