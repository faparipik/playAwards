import httpStatus from 'http-status';
import ApiError from '../utils/ApiErrors.js';
import tokenServices from './token.services.js';
import { tokenTypes } from '../constants/token.constants.js';
import userService from './user.service.js';

const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = tokenServices.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD,
    );

    const user = userService.findUserById(resetPasswordTokenDoc.user_id);

    if (!user[0]) {
      throw new Error();
    }

    userService.updateUserById(user[0].id, { password: newPassword });
    tokenServices.deleteMany(user[0].id, tokenTypes.RESET_PASSWORD);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password Reset Failed');
  }
};

export default {
  resetPassword,
};
