const { Joi, Segments } = require("celebrate");

const createRoleDto = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(null, ""),
  }),
};

module.exports = {
  createRoleDto,
};
