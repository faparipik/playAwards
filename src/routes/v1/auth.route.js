import express from 'express';
import authController from '../../controllers/auth.controller.js';
import validate from '../../middlewares/validate.js';
import authValidation from '../../validations/auth.validation.js';

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  authController.register,
);

router.post('/login', validate(authValidation.login), authController.login);

router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword,
);

router.post(
  '/reset-password',
  validate(authValidation.resetPassword),
  authController.resetPassword,
);

export default router;
