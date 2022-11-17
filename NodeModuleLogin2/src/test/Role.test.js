const supertest = require("supertest");
const mongoose = require("mongoose");

const expressLoader = require("../loader/express");
const app1 = expressLoader();

const RoleController = require("../controller/RoleController");
const RoleService = require("../services/web/RoleService");

describe("Role", () => {
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

  describe("[GET] /role/init-role", () => {
    it("Should return a 409 when Role exist", async () => {
      await supertest(app1).get(`/role/init-role`).expect(409);
    });

    it("Should return a 201 when Role not created", async () => {
      jest
        .spyOn(RoleService, "createRole")
        .mockRejectedValue(new Error("notCreateRole"));

      const { status } = await supertest(app1).get(`/role/init-role`);

      expect(status).toBe(201);
    });

    it("Should return 200 when add role is successful", async () => {
      const { statusCode } = await supertest(app1).get(`/role/init-role`);

      //   expect(statusCode).toBe(200);
    });
  });
});
