module.exports = {
  notFound: {
    status: 404,
    message: "User Not Found",
  },
  isExist: {
    status: 409,
    message: "User Already Exists",
  },

  notCreateUser: {
    status: 200,
    message: "Not Create User",
  },

  wrongPassword: {
    status: 401,
    message: "Wrong Password",
  },

  existUsername: {
    status: 409,
    message: "Username Already Exists",
  },

  notPermission: {
    status: 400,
    message: "User Not Have Permission",
  },
};
