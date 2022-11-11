const UserRepository = require("../../repository/UserRepository");

class UserService {
  async save(userModel) {
    const checkEmail = await this.checkExists({
      "local.email": userModel.email,
    });
    if (checkEmail) {
      throw new Error("existEmail");
    }
    const dataUser = await UserRepository.save(userModel);
    if (!dataUser) {
      throw new Error("notCreateUser");
    }

    return dataUser;
  }

  async saveGitHub(userModel) {
    const dataUser = await UserRepository.create(userModel);
    if (!dataUser) {
      throw new Error("notCreateUser");
    }

    return dataUser;
  }

  async checkExists(condition) {
    const check = await UserRepository.checkExists(condition);
    if (check) {
      return true;
    }

    return false;
  }

  async findOneUserByEmail(email) {
    const user = await UserRepository.findOneByEmail(email);
    if (!user) {
      throw new Error("notFound");
    }

    return user;
  }

  async findOneAndUpdateByCondition(condition, update) {
    const user = await UserRepository.findOneAndUpdateByCondition(
      condition,
      update
    );
    if (!user) {
      throw new Error("notFound");
    }

    return user;
  }

  async findOneById(id) {
    const user = await UserRepository.findOneById(id);
    if (!user) {
      throw new Error("notFound");
    }

    return user;
  }

  async getAllUserWithConditionShow(hasShow) {
    const users = await UserRepository.findAllHasShow(hasShow);

    if (!users) {
      throw new Error("notFound");
    }

    return users;
  }

  async deleteById(idUser) {
    const deleteUser = await UserRepository.deleteById(idUser);

    if (!deleteUser) {
      throw new Error("notFound");
    }

    return deleteUser;
  }
}

module.exports = new UserService();
