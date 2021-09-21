import functionHelpers from '../Service/Users/utils/search.user.service';
import UserDevice from '../Models/Users.Device.model';
import tokenCreator from '../Service/Users/utils/create.new.token';

async function limitedCheckFactorWithToken(req, res, next) {
  const token = req.headers.authorization;
  const user = await functionHelpers.searchUserService(token)

  if (user === false) {
    return res.status(403).json({error: 'not enough rights'});
  } else {
    const newToken = tokenCreator.newTokenCreator(user);
    await UserDevice.update({token: newToken}, {where: {token}})
    req.body.user = user;
    req.body.newToken = newToken;
    return next();
  }
}

export default limitedCheckFactorWithToken
