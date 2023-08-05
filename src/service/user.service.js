import httpStatus from 'http-status';
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

export default {
  createUser,
  findUserById,
};
