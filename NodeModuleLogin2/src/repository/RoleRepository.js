const RoleModel = require("../models/RoleModel");

class RoleRepository {
  checkExists(dataCheck) {
    return new Promise((resolve, reject) => {
      RoleModel.exists(dataCheck)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  create(roleModel) {
    return new Promise((resolve, reject) => {
      RoleModel.create(roleModel)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  findOneByField(conditionField) {
    return new Promise((resolve, reject) => {
      RoleModel.findOne(conditionField)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  findOneByName(name) {
    return new Promise((resolve, reject) => {
      RoleModel.findOne({ name: name })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new RoleRepository();
