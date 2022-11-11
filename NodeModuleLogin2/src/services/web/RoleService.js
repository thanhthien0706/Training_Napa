const RoleRepository = require("../../repository/RoleRepository");

class RoleService {
  async checkRoleExist(dataCheck) {
    const check = await RoleRepository.checkExists(dataCheck);
    if (!check) {
      return false;
    }
    return true;
  }

  async createRole(roleDto) {
    const check = await this.checkRoleExist({ name: roleDto.name });

    if (check) {
      throw new Error("isExist");
    }

    const newRole = await RoleRepository.create(roleDto);
    if (!newRole) {
      throw new Error("notCreateRole");
    }

    return newRole;
  }

  async findOneByName(nameRole) {
    const dataRole = await RoleRepository.findOneByName(nameRole);
    if (!dataRole) {
      throw new Error("notFindRole");
    }
    return dataRole;
  }

  async findOneByField(condition) {
    const dataRole = await RoleRepository.findOneByField(condition);

    if (!dataRole) {
      throw new Error("notFindRole");
    }
    return dataRole;
  }
}

module.exports = new RoleService();
