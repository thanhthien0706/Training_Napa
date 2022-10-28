const userModel = require("../model/UserModel");

class UserController {
  async create(req, res) {
    try {
      const formData = req.body;
      const userAccount = await new userModel(formData);
      await userAccount.save();

      if (userAccount) {
        res.status(200).json({
          mess: "Register successfully",
          code: "registered_success",
          success: true,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new UserController();
