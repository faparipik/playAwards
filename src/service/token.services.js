import jwt from 'jsonwebtoken';

import config from '../config/config.js';
import { tokenTypes } from '../constants/token.constants.js';

const generateToken = (userId, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthToken = (user) => {
  return generateToken(user.id, tokenTypes.ACCESS);
};

export default { generateAuthToken };
