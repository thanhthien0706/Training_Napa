const { default: mongoose } = require("mongoose");
const { UserModel, StatusActive } = require("../models/UserModel");

class UserRepository {
  checkExists(condition) {
    return new Promise((resolve, reject) => {
      UserModel.exists(condition)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  create(userModel) {
    return new Promise((resolve, reject) => {
      UserModel.create(userModel)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  save(userModel) {
    return new Promise((resolve, reject) => {
      const newUser = new UserModel();
      newUser.username = userModel.username;
      newUser.local.email = userModel.email;
      newUser.local.password = newUser.generateHash(userModel.password);
      newUser.activity = StatusActive.ACTIVE;
      newUser.role = userModel.role;

      newUser
        .save()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  // saveGitHub(userModel);

  findOneByEmail(email) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ "local.email": email })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  findOneAndUpdateByCondition(condition, update) {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndUpdate(condition, update)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  findOneById(id) {
    return new Promise((resolve, reject) => {
      UserModel.findById(id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  findAllHasShow(hasShow) {
    return new Promise((resolve, reject) => {
      UserModel.aggregate([
        { $match: {} },
        {
          $project: {
            ...hasShow,
          },
        },
      ])
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  deleteById(idUser) {
    return new Promise((resolve, reject) => {
      UserModel.deleteOne({ _id: idUser })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new UserRepository();
