import { schema } from './incoming.data.validator';
import functionHelpers from '../Service/Users/utils/search.user.service';

async function limitedCheckFactorWithoutToken(req, res, next) {
  const incomingDataValid = await schema.validate(req.body);
  if (incomingDataValid.error) {
    return res.status(401).json({ error: incomingDataValid.error.details });
  }
  next();
}

async function limitedCheckFactorWithToken(req, res, next) {
  const incomingDataValid = await schema.validate(req.body);

  if (incomingDataValid.error) {
    return res.status(401).json({ error: incomingDataValid.error.details });
  }
  if (await functionHelpers.searchUserService(req.headers.authorization) === false) {
    return res.status(403).json({ error: 'not enough rights' });
  }
  next();
}

const limitedCheckFactor = {
  limitedCheckFactorWithoutToken,
  limitedCheckFactorWithToken,
};

export default limitedCheckFactor;
