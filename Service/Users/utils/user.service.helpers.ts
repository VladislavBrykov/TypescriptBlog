import UserDevice from '../../../Models/Users.Device.model';
import User from '../../../Models/user.model';
import tokenService from './create.new.token';

function updateTokenUserById(nameObject, newToken, data) {
  nameObject.update({ token: newToken }, {
    where: {
      phoneEmail: data.phoneEmail,
    },
  });
  return true;
}

async function userWithUpdatedToken(token: string) {
  const { tokenValidator, newTokenCreater } = tokenService;
  const data = tokenValidator(token);
  const newToken = newTokenCreater(data.phoneEmail);
  const searchUser = await UserDevice.findOne({ where: { token } });

  if (searchUser) {
    await Promise.all([
      updateTokenUserById(searchUser, newToken, data),
      updateTokenUserById(UserDevice, newToken, data),
    ]);
    return searchUser;
  }
  return false;
}

async function searchUserService(token: string) {
  const searchUser = await UserDevice.findOne({
    where: { token },
    attributes: ['phoneEmail'],
  });
  if (searchUser) {
    return searchUser.getDataValue('phoneEmail');
  }
  return false;
}

async function searchUserTable(phoneEmail: string) {
  const searchUser = await User.findOne({ where: { phoneEmail } });
  return (searchUser || false);
}

const functionHelpers = {
  searchUserService,
  userWithUpdatedToken,
  searchUserTable,
};

export default functionHelpers;
