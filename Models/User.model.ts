import { Model, DataTypes } from 'sequelize';
import sequelize from '../Config/database';

class User extends Model {}

User.init({
  phoneEmail: {
    type: DataTypes.STRING,
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
