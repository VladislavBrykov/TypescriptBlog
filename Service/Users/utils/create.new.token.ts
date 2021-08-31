import * as jwt from 'jsonwebtoken';
import allConstantsUsedInProject from '../../../Helpers/all.constants';

function newTokenCreator(phoneEmail): string {
  return jwt.sign({
    exp: Math.floor(Date.now() / allConstantsUsedInProject.MS) + allConstantsUsedInProject.TOKEN_TTL,
    phoneEmail,
  }, allConstantsUsedInProject.SECRET_KEY);
}

function tokenValidator(token) {
  try {
    return jwt.verify(token, allConstantsUsedInProject.SECRET_KEY);
  } catch (error) {
    return null;
  }
}

export default { newTokenCreator, tokenValidator };
