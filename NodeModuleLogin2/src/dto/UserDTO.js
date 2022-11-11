const { Joi, Segments } = require("celebrate");

const createUserDto = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const signInUserDto = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const forgotPasswordDto = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPasswordDto = {
  [Segments.QUERY]: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const changePasswordDto = {
  [Segments.BODY]: Joi.object().keys({
    newPassword: Joi.string().required(),
    tokenReset: Joi.string().required(),
  }),
};

module.exports = {
  createUserDto,
  signInUserDto,
  forgotPasswordDto,
  resetPasswordDto,
  changePasswordDto,
};
