import * as jwt from 'jsonwebtoken';

function newTokenCreator(phoneEmail): string {
  return jwt.sign({
    exp: Math.floor(Date.now() / Number.parseInt(process.env.MS)) + Number.parseInt(process.env.TOKEN_TTL),
    phoneEmail,
  }, process.env.SECRET_KEY);
}

function tokenValidator(token) {
  const SECRET_KEY = 4444;

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

export default { newTokenCreator, tokenValidator };
