const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const expressLoader = require("../loader/express");
const app1 = expressLoader();

const AuthService = require("../services/web/AuthService");
const UserService = require("../services/web/UserService");
const JwtService = require("../services/plugins/JwtService");

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  username: "Thanh Thien",
  local: {
    email: "thanhthien",
    password: "thien123",
  },
};

const userInput = {
  username: "Thanh Thien",
  email: "thanhthien@gmail.com",
  password: "thien123",
};

describe("Auth", () => {
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

  describe("[POST] /auth/signup", () => {
    it("Should valid field signup", async () => {
      const { statusCode, body } = await supertest(app1)
        .post("/auth/signup")
        .send({
          username: "Thanh Thien",
          email: "thanhthien",
          password: "thien123",
        });

      expect(statusCode).toBe(500);
    });
    it("Should create user", async () => {
      const createUserServiceMock = jest
        .spyOn(AuthService, "signup")
        .mockReturnValueOnce(userPayload);

      const { statusCode, body } = await supertest(app1)
        .post("/auth/signup")
        .send(userInput);

      expect(statusCode).toBe(200);
      expect(body.data).toEqual(userPayload);
      expect(body.status).toEqual(true);

      expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
    });
  });

  describe("[POST] /auth/signin", () => {
    const dataUserOutput = {
      local: {
        email: "thanhthien@gmail.com",
        password:
          "$2a$08$NCtVrTyV8XKeQ1b9l188N.g/bwgX88msFPt8/xKmcl.IDuES7bMvO",
      },
      username: "Thanh Thien",
      activity: true,
      role: {
        $oid: "6376226ce1d529fc9dfbcd72",
      },
      createdAt: {
        $date: {
          $numberLong: "1668686455109",
        },
      },
      updatedAt: {
        $date: {
          $numberLong: "1668686455109",
        },
      },
      __v: 0,
      validPassword: (password) => {
        return bcrypt.compareSync(
          password,
          "$2a$08$NCtVrTyV8XKeQ1b9l188N.g/bwgX88msFPt8/xKmcl.IDuES7bMvO"
        );
      },
    };
    it("Should return 500 when field body request error", async () => {
      const { statusCode, body } = await supertest(app1)
        .post("/auth/signin")
        .send({
          email: "thanhthien",
          password: "thien123",
        });

      expect(statusCode).toBe(500);
    });

    it("Should return error 401 when wrong password", async () => {
      const findOneUserServiceMock = jest
        .spyOn(UserService, "findOneUserByEmail")
        .mockReturnValueOnce(dataUserOutput);

      const dataInput = {
        email: "thanhthien@gmail.com",
        password: "thien321",
      };

      const { statusCode, body } = await supertest(app1)
        .post("/auth/signin")
        .send(dataInput);

      expect(statusCode).toBe(401);
    });

    it("Should return true when generic token false", async () => {
      jest
        .spyOn(UserService, "findOneUserByEmail")
        .mockReturnValueOnce(dataUserOutput);

      jest
        .spyOn(JwtService, "generateToken")
        .mockRejectedValue(new Error("notGeneratedToken"));

      const dataInput = {
        email: "thanhthien@gmail.com",
        password: "thien123",
      };

      const { statusCode } = await supertest(app1)
        .post("/auth/signin")
        .send(dataInput);

      expect(statusCode).toBe(500);
    });

    it("Should return true and status 200 when finid sign in", async () => {
      jest
        .spyOn(UserService, "findOneUserByEmail")
        .mockReturnValueOnce(dataUserOutput);

      jest.spyOn(JwtService, "generateToken").mockReturnValueOnce({
        token: "blablablablablabla",
      });

      const dataInput = {
        email: "thanhthien@gmail.com",
        password: "thien123",
      };

      const { statusCode, body } = await supertest(app1)
        .post("/auth/signin")
        .send(dataInput);
      console.log(body);

      expect(statusCode).toBe(200);
      expect(body.data.token).toEqual("blablablablablabla");
    });
  });
});
