import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import 'reflect-metadata';
import sequelize from '../../Config/database';
import functionHelpers from '../../Service/Users/utils/user.service.helpers';
import UserService from '../../Service/Users/users.servece.functional';

import {
  authorizationValidator,
  tokenValidator,
  deleteUserByAdminValidator,
  passUpdateValidator,
} from '../../Helpers/incoming.data.validator';

sequelize.sync({ force: true }).then(() => console.log('database created and ready to work'));

@injectable()
class UserController {
private _userService: UserService;

constructor(@inject(TYPES.Users) userService: UserService) {
  this._userService = userService;
}

    registration = async (req: Request, res: Response) => {
      const { password, phoneEmail } = req.body;

      const incomingDataValid = await authorizationValidator(password, phoneEmail);
      if (incomingDataValid.status === false) {
        return res.status(401).json({ error: incomingDataValid });
      }
      const resRegistration: any = await this._userService.serviceRegistration(
        phoneEmail,
        password,
      );
      return resRegistration
        ? res.status(200)
          .json({ status: 'registration successful' })
        : res.status(404)
          .json({ status: 'registration error, user exists' });
    };

    login = async (req: Request, res: Response) => {
      const { password, phoneEmail } = req.body;
      const incomingDataValid = await authorizationValidator(password, phoneEmail);
      if (incomingDataValid.status === false) {
        return res.status(401).json({ error: incomingDataValid });
      }
      const resLogin = await this._userService.serviceLogin(phoneEmail, password);

      return resLogin
        ? res.status(200).json({ resLogin })
        : res.status(200).json({ status: 'Invalid username or password' });
    };

    logout = async (req: Request, res: Response) => {
      const token: string = req.headers.authorization;
      const incomingDataValid = await tokenValidator(token);
      if (incomingDataValid.status === false) {
        return res.status(401).json({ error: incomingDataValid });
      }
      const { all } = req.query;
      const resLogout: boolean = await this._userService.serviceLogout(token, all);
      return resLogout
        ? res.status(200).json({ status: true })
        : res.status(404).json({ status: 'token error' });
    };

    deleteUser = async (req: Request, res: Response) => {
      const token: string = req.headers.authorization;
      const incomingDataValid = await tokenValidator(token);
      if (incomingDataValid.status === false) {
        return res.status(401).json({ error: incomingDataValid });
      }
      const resLogout: boolean = await this._userService.serviceDeleteUser(token);
      return resLogout
        ? res.status(200).json({ status: true })
        : res.status(404).json({ status: 'you can\'t logout' });
    };

    deleteUserByAdmin = async (req: Request, res: Response) => {
      const token: string = req.headers.authorization;
      const { username } = req.body;

      const incomingDataValid = await deleteUserByAdminValidator(token, username);
      if (incomingDataValid.status === false) {
        return res.status(401).json({ error: incomingDataValid });
      }
      const resLogout: boolean = await this._userService.serviceDeleteUserByAdmin(username);
      return resLogout
        ? res.status(200).json({ status: true })
        : res.status(404).json({ status: 'token error' });
    };

    passwordUpdate = async (req: Request, res: Response) => {
      const { password, phoneEmail, newPassword } = req.body;
      const token: string = req.headers.authorization;
      const incomingDataValid = await passUpdateValidator(password, phoneEmail, newPassword, token);

      if (incomingDataValid.status === false) {
        return res.status(401).json({ error: incomingDataValid });
      }
      if (await functionHelpers.searchUserService(token) === false) {
        return res.status(405).json({ error: 'not enough rights' });
      }

      const resLogin = await this._userService.servicePasswordUpdate(
        phoneEmail,
        password,
        newPassword,
        token,
      );
      return resLogin.status === true
        ? res.status(200).json({ login: 'success', resLogin })
        : res.status(200).json({ status: 'login error' });
    };
}

export default UserController;
