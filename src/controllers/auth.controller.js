import catchAsync from '../utils/catchAsync.js';
import userService from '../service/user.service.js';
import tokenService from '../service/token.services.js';
import httpStatus from 'http-status';

const register = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  res.redirect('/login');
  res.status(httpStatus.CREATED).send(result);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUser(email, password);
  const token = await tokenService.generateAuthToken(user);

  res.cookie('AuthToken', token);
  res.redirect('/protected');
  res.send({ user, token });
});

export default {
  register,
  login,
};
