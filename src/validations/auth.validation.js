import Joi from 'joi';
import customValidation from './custom.validation.js';

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(customValidation.password),
    name: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(customValidation.password),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(customValidation.password),
  }),
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
};
