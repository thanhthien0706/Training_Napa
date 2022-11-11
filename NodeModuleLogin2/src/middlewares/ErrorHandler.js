const { ErrorBasicDTO } = require("../dto/ErrorDTO");

function ErrorHandler(Error, req, res, next) {
  res.status(Error.status || 500);
  res.json(new ErrorBasicDTO(true, Error.status, Error.message));
  return res;
}

module.exports = ErrorHandler;
