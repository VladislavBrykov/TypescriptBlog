import { Request, Response } from 'express';
import { injectable, inject, Container } from 'inversify';
import { TYPES } from '../../types';
import 'reflect-metadata';
import sequelize from '../../Config/database';
import functionHelpers from '../../Service/Users/utils/search.user.service';
import { Users } from '../../interfaces';

sequelize.sync({ force: true }).then(() => console.log('database created and ready to work'));

@injectable()
class UserController {
    private _userService: { myContainer: Container; userService: Users };

    constructor(@inject(TYPES.Users) userService: { myContainer: Container; userService: Users }) {
      this._userService = userService;
    }

    registration = async (req: Request, res: Response) => {
      const { password, phoneEmail } = req.body;

      const resRegistration: any = await this._userService.userService.serviceRegistration(
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
      const loginUser = await this._userService.userService.serviceLogin(phoneEmail, password);

      return loginUser
        ? res.status(200).json({ loginUser })
        : res.status(401).json({ status: 'Invalid username or password' });
    };

    logout = async (req: Request, res: Response) => {
      const token: string = req.headers.authorization;
      const { all } = req.query;
      const logoutUser: boolean = await this._userService.userService.serviceLogout(
        token,
        all.toString(),
      );
      return logoutUser
        ? res.status(200).json({ status: true })
        : res.status(401).json({ status: 'token error' });
    };

    deleteUser = async (req: Request, res: Response) => {
      const token: string = req.headers.authorization;
      const logoutUser: boolean = await this._userService.userService.serviceDeleteUser(token);
      return logoutUser
        ? res.status(200).json({ status: true })
        : res.status(403).json({ status: 'you can\'t logout' });
    };

    deleteUserByAdmin = async (req: Request, res: Response) => {
      const { username } = req.body;
      const logoutUser: boolean = await this._userService.userService.serviceDeleteUserByAdmin(username);
      return logoutUser
        ? res.status(200).json({ status: true })
        : res.status(401).json({ status: 'token error' });
    };

    passwordUpdate = async (req: Request, res: Response) => {
      const { password, phoneEmail, newPassword } = req.body;
      const token: string = req.headers.authorization;

      if (await functionHelpers.searchUserService(token) === false) {
        return res.status(403).json({ error: 'not enough rights' });
      }

      const loginUser = await this._userService.userService.servicePasswordUpdate(
        phoneEmail,
        password,
        newPassword,
        token,
      );
      return loginUser.status === true
        ? res.status(200).json({ login: 'success', loginUser })
        : res.status(403).json({ status: 'login error' });
    };
}

export default UserController;
