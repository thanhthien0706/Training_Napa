const { Joi, Segments } = require("celebrate");

const userIdParamDto = {
  [Segments.PARAMS]: Joi.object().keys({
    idUser: Joi.string().required(),
  }),
};

const userUpdateDto = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string(),
  }),
};

module.exports = {
  userIdParamDto,
  userUpdateDto,
};
