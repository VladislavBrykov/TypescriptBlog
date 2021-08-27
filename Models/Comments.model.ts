import { Model, DataTypes } from 'sequelize';
import sequelize from '../Config/database';

class Comments extends Model {}

Comments.init({
  typeAction: {
    type: DataTypes.STRING,
    unique: false,
  },
  phoneEmail: {
    type: DataTypes.STRING,
    unique: false,
  },
  idToDo: {
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

export default Comments;
