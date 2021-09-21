import {Model, DataTypes} from 'sequelize';
import sequelize from '../Config/database';
import User from './User.model';

class UserDevice extends Model {
  phoneEmail: string;

  token: string;
}

UserDevice.init({
  userPhoneEmail: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'devices',
});

UserDevice.belongsTo(User);


export default UserDevice;
