import catchAsync from '../utils/catchAsync.js';
import userService from '../service/user.service.js';
import httpStatus from 'http-status';

const register = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(result);
});

export default {
  register,
};
