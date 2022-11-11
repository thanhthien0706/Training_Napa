const UserService = require("../web/UserService");

class AdminService {
  async getListUsers() {
    const users = await UserService.getAllUserWithConditionShow({
      _id: 1,
      "local.email": 1,
      "github.id": 1,
      "github.token": 1,
      "github.displayName": 1,
      "github.username": 1,
      role: 1,
      activity: 1,
    });
    return users;
  }

  async updateUser(idUser, payload) {
    const user = await UserService.findOneAndUpdateByCondition(
      {
        _id: idUser,
      },
      payload
    );

    if (!user) {
      throw new Error("notFound");
    }
    return user;
  }

  async deleteUserById(idUser) {
    const deleteUser = await UserService.deleteById({ _id: idUser });

    return deleteUser;
  }
}

module.exports = new AdminService();
