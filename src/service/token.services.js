import jwt from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';

import config from '../config/config.js';
import { tokenTypes } from '../constants/token.constants.js';
import userService from './user.service.js';
import ApiError from '../utils/ApiErrors.js';
import tokenRepository from '../repositories/token.repository.js';

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthToken = (user) => {
  const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');

  return generateToken(user.id, expires, tokenTypes.ACCESS);
};

const generateResetPasswordToken = (email) => {
  const user = userService.findUserByEmail(email);
  if (!user[0]) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this email');
  }

  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes',
  );

  const resetPasswordToken = generateToken(
    user[0].id,
    expires,
    tokenTypes.RESET_PASSWORD,
  );

  saveToken(resetPasswordToken, user[0].id, expires, tokenTypes.RESET_PASSWORD);

  return resetPasswordToken;
};

const saveToken = (token, userId, expires, type) => {
  tokenRepository.create(token, userId, expires, type);
};

const verifyToken = (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = tokenRepository.findToken(token, type, payload.sub);
  if (!tokenDoc[0]) {
    throw new Error('Token not Found');
  }
  return tokenDoc[0];
};

const deleteMany = (userId, type) => {
  tokenRepository.deleteMany(userId, type);
};

export default {
  generateAuthToken,
  generateResetPasswordToken,
  saveToken,
  verifyToken,
  deleteMany,
};
