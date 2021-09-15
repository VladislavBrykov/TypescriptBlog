import { injectable } from 'inversify';
import UserDevice from '../../Models/Users.Device.model';
import tokenCreator from './utils/create.new.token';
import ResTypeid from './utils/find.out.which.id';
import { Users } from '../../interfaces';
import userRoot from '../Posts/utils/root.user';
import User from '../../Models/User.model';

@injectable()
class UserService implements Users {
  constructor() {
  }

  async serviceLogin(phoneEmail: string, password: string): Promise<any> {
    const searchUser = await User.findOne({
      where: { phoneEmail, password },
      attributes: ['phoneEmail', 'typeId', 'role'],
    });

    if (searchUser) {
      const newToken = tokenCreator.newTokenCreator(phoneEmail);
      const newDevice = {
        phoneEmail: searchUser.getDataValue('phoneEmail'),
        token: newToken,
      };
      await UserDevice.create(newDevice);
      return {
        newToken,
        searchUser,
      };
    }
    return false;
  }

  async serviceRegistration(phoneEmail: string, password: string): Promise<any> {
    const typeId: string = ResTypeid(phoneEmail);
    const newToken: string = tokenCreator.newTokenCreator(phoneEmail);

    const registrationUser = {
      phoneEmail,
      password,
      token: newToken,
      typeId,
      role: 'admin',
    };
    const searchUser = await User.findOne({ where: { phoneEmail } });
    if (searchUser) {
      return false;
    }
    await User.create(registrationUser);
    return true;
  }

  async serviceLogout(token: string, all: string): Promise<any> {
    const searchUser = await UserDevice.findOne({ where: { token } });

    if (all === 'true') {
      await UserDevice.update(
        { token: null },
        { where: { phoneEmail: searchUser.phoneEmail } },
      );
    } else {
      await UserDevice.update(
        { token: null },
        { where: { token } },
      );
    }
    return true;
  }

  async serviceDeleteUser(token: string): Promise<any> {
    const searchUser = await UserDevice.findOne({ where: { token } });
    if (searchUser) {
      await UserDevice.destroy({ where: { phoneEmail: searchUser.phoneEmail } });
      await User.destroy({ where: { phoneEmail: searchUser.phoneEmail } });
      return true;
    }
    return false;
  }

  async serviceDeleteUserByAdmin(phoneEmail: string): Promise<boolean> {
    if (await userRoot.userRootById(phoneEmail) === 'admin') {
      await UserDevice.destroy({ where: { phoneEmail } });
      await User.destroy({ where: { phoneEmail } });
      return true;
    }
    return false;
  }

  async servicePasswordUpdate(
    phoneEmail: string,
    password: string,
    newPassword: string,
    token: string,
  ): Promise<any> {
    const searchUser = User.findOne({ where: { phoneEmail, password } });
    if (searchUser) {
      const newToken = tokenCreator.newTokenCreator(phoneEmail);
      await User.update({ password: newPassword }, { where: { phoneEmail } });
      await UserDevice.update({ token: newToken }, { where: { token } });

      return { status: true, token: newToken };
    }
    return { status: false, error: 'password update error' };
  }
}

export default UserService;
