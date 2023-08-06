import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';

import userRepository from '../repositories/user.repository.js';
import ApiError from '../utils/ApiErrors.js';

const createUser = (userBody) => {
  if (userRepository.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
  }

  return userRepository.create(userBody);
};

const findUserById = (id) => {
  return userRepository.findUserById(id);
};

const findUserByEmail = (email) => {
  return userRepository.getUserByEmail(email);
};

const loginUser = async (email, password) => {
  const user = userRepository.getUserByEmail(email);

  if (!user[0] || !(await isPasswordMatch(password, user[0].password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorect email or password');
  }

  return user[0];
};

const isPasswordMatch = async (providedPassword, userPassword) => {
  return await bcrypt.compare(providedPassword, userPassword);
};

export default {
  createUser,
  findUserById,
  loginUser,
  isPasswordMatch,
  findUserByEmail,
};
