const RoleModel = require("../model/RoleModel");

class RoleController {
  async initData() {
    try {
      const arrayInforRole = [
        {
          name: "ROLE_ADMIN",
          description: "",
        },
        {
          name: "ROLE_USER",
          description: "",
        },
      ];

      arrayInforRole.forEach((role) => {
        RoleModel.exists({ name: role.name })
          .then((data) => {
            if (!data) {
              this.create(role);
            }
          })
          .catch((err) => {
            console.log(`Error check role ${err.message}`);
          });
      });
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }
  }

  async create(data) {
    try {
      return await RoleModel.create(data);
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }
  }
}

module.exports = new RoleController();
