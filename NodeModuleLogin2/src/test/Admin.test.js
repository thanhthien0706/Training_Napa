const supertest = require("supertest");
const mongoose = require("mongoose");

const expressLoader = require("../loader/express");
const app1 = expressLoader();

const UserManagerController = require("../controller/admin/UserManagerController");
const AdminService = require("../services/web/AdminService");

const CheckAccount = require("../middlewares/CheckAccount");

describe("Admin Manager User", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/test-db_login", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("Check global", () => {
    it("Should return false user not pemision ADMIN", async () => {
      jest
        .spyOn(CheckAccount, "checkRole")
        .mockRejectedValue(new Error("notPermission"));

      const { statusCode } = await supertest(app1).get("/admin/list-users");

      expect(statusCode).toBe(400);
    });

    it("Should return false user no token", async () => {
      jest
        .spyOn(CheckAccount, "checkRole")
        .mockRejectedValue(new Error("tokenNotFound"));

      const { statusCode } = await supertest(app1).get("/admin/list-users");

      expect(statusCode).toBe(400);
    });
  });
});
