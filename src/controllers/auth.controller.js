import httpStatus from 'http-status';

import catchAsync from '../utils/catchAsync.js';
import userService from '../service/user.service.js';
import tokenService from '../service/token.services.js';
import emailServices from '../service/email.services.js';
import authServices from '../service/auth.services.js';
import config from '../config/config.js';

const register = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  res.redirect('/login');
  res.status(httpStatus.CREATED).send(result);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUser(email, password);
  const token = tokenService.generateAuthToken(user);

  res.cookie('AuthToken', token);
  res.redirect('/protected');
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = tokenService.generateResetPasswordToken(
    req.body.email,
  );

  emailServices.sendEmail(
    req.body.email,
    `To reset your password please go to Link: ${config.resetPasswordUrl}/reset-password?token=${resetPasswordToken}`,
  );
  res.redirect('/login');
});

const resetPassword = catchAsync((req, res) => {
  authServices.resetPassword(req.query.token, req.body.password);
  res.redirect('/login');
});

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
};
