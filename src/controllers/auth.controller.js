import catchAsync from '../utils/catchAsync.js';
import userService from '../service/user.service.js';
import httpStatus from 'http-status';

const register = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUser(email, password);

  res.send(user);
});

export default {
  register,
  login,
};
