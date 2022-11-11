module.exports = {
  tokenNotFound: {
    status: 400,
    message: "Token Not Found",
  },

  notGeneratedToken: {
    status: 500,
    message: "Not Generated Token",
  },

  notVerifyToken: {
    status: 401,
    message: "Not Verify Token",
  },

  expiredTokens: {
    status: 401,
    message: "Expired Tokens",
  },
};
