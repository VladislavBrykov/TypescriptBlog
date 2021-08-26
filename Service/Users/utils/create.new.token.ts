import * as jwt from 'jsonwebtoken';
import allConstantsUsedInProject from '../../../Helpers/all.constants.used.in.project';

function newTokenCreater(phoneEmail): string {
  return jwt.sign({
    exp: Math.floor(Date.now()
      / allConstantsUsedInProject.ms)
      + allConstantsUsedInProject.tenMin,
    phoneEmail,
  }, allConstantsUsedInProject.secretKey);
}

function tokenValidator(token) {
  try {
    return jwt.verify(token, allConstantsUsedInProject.secretKey);
  } catch (error) {
    return null;
  }
}

export default { newTokenCreater, tokenValidator };
