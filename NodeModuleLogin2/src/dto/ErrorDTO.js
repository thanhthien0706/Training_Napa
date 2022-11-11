class ErrorBasicDTO {
  constructor(error = true, status = 500, message = "Internal Server Error") {
    this.error = error;
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  ErrorBasicDTO,
};
