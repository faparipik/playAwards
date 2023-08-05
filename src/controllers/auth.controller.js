import catchAsync from '../utils/catchAsync.js';

const register = catchAsync(async (_req, res) => {
  res.status(201).send('registered');
});

export default {
  register,
};
