import User from '../../../Models/user.model';
import UserDevice from '../../../Models/Users.Device.model';

async function userRootByToken(token) {
  const searchUser = await UserDevice.findOne({
    where: { token },
    attributes: ['phoneEmail'],
  });
  if (searchUser) {
    return searchUser.getDataValue('phoneEmail');
  }
  return false;
}

async function userRootById(phoneEmail: string) {
  const searchUser = await User.findOne({
    where: { phoneEmail },
    attributes: ['role'],
  });
  if (searchUser) {
    return searchUser.getDataValue('role');
  }
  return false;
}

const userRoot = {
  userRootByToken,
  userRootById,
};

export default userRoot;
