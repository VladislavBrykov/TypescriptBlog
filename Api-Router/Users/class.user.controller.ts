import {Request, Response} from 'express';
import {injectable, inject, Container} from 'inversify';
import {TYPES} from '../../types';
import 'reflect-metadata';
import sequelize from '../../Config/database';
import {Users} from '../../interfaces';
import valid from '../../Helpers/incoming.data.validator';

sequelize.sync({force: true}).then(() => console.log('database created and ready to work'));

@injectable()
class UserController {
  private capacityUser: { myContainer: Container; userService: Users };

  constructor(@inject(TYPES.Users) userService: { myContainer: Container; userService: Users }) {
    this.capacityUser = userService;
  }

  registration = async (req: Request, res: Response) => {
    const {password, phoneEmail} = req.body;
    await valid.registrationLoginInputData(req.body);

    const registerUser: boolean = await this.capacityUser.userService.registration(
      phoneEmail,
      password,
    );
    if (!registerUser) {
      throw new Error('User not registered, user exists');
    }
    return res.status(200).json({status: 'registration successful'});
  };

  login = async (req: Request, res: Response) => {
    const {password, phoneEmail} = req.body;
    await valid.registrationLoginInputData(req.body);
    const loginUser: Promise<object> = await this.capacityUser.userService.login(phoneEmail, password);

    if (loginUser[0] === false) {
      throw new Error('Invalid username or password');
    }
    return res.status(200).json({loginUser})
  };

  logout = async (req: Request, res: Response) => {
    const {newToken} = req.body;
    const {all} = req.query;
    const logoutUser: boolean = await this.capacityUser.userService.logout(newToken, all.toString());

    if (!logoutUser) {
      throw new Error('token error');
    }
    return res.status(200).json({status: true})
  };

  deleteUser = async (req: Request, res: Response) => {
    const {newToken} = req.body;
    const deleteUser: boolean = await this.capacityUser.userService.deleteUser(newToken);

    if (!deleteUser) {
      throw new Error('you can\'t logout');
    }
    return res.status(200).json({status: true})
  };

  deleteUserByAdmin = async (req: Request, res: Response) => {
    const {username, newToken} = req.body;
    await valid.deleteUserByAdminInputData(req.body);
    const logoutUser: boolean = await this.capacityUser.userService.deleteUserByAdmin(username);

    if (!logoutUser) {
      throw new Error('token error');
    }

    return res.status(200).json({status: true, newToken})
  };

  passwordUpdate = async (req: Request, res: Response) => {
    const {password, phoneEmail, newPassword, newToken} = req.body;
    await valid.passwordUpdateInputData(req.body);

    const updatePass: Promise<object> = await this.capacityUser.userService.passwordUpdate(
      phoneEmail,
      password,
      newPassword,
      newToken,
    );

    if (!updatePass) {
      throw new Error('token error');
    }
    return res.status(200).json({login: 'success', updatePass, newToken});
  };
}

export default UserController;
