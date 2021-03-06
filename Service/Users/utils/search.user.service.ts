import UserDevice from '../../../Models/Users.Device.model';
import tokenService from './create.new.token';
import User from '../../../Models/User.model';

function updateTokenUserById(nameObject, newToken, data) {
  nameObject.update({token: newToken}, {
    where: {
      phoneEmail: data.phoneEmail,
    },
  });
  return true;
}

async function userWithUpdatedToken(token: string) {
  const {tokenValidator, newTokenCreator} = tokenService;
  const data = tokenValidator(token);
  const newToken = newTokenCreator(data.phoneEmail);
  const searchUser = await UserDevice.findOne({where: {token}});

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
    where: {token},
    attributes: ['userPhoneEmail'],
  });
  if (searchUser) {
    return searchUser.getDataValue('userPhoneEmail');
  }
  return false;
}

async function searchUserTable(phoneEmail: string) {
  const searchUser = await User.findOne({where: {phoneEmail}});
  return (searchUser || false);
}

const functionHelpers = {
  searchUserService,
  userWithUpdatedToken,
  searchUserTable,
};

export default functionHelpers;
