const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const httpStatus = require("http-status");
const faker = require("faker");
const setupTestForDB = require("../utils/setupTestForDB");
const { User } = require("../../src/models");

setupTestForDB();

describe("Test Auth routes", () => {
  beforeAll((done) => {
    if (!mongoose.connection.db) {
      mongoose.connection.on("connected", done);
    } else {
      done();
    }
  }, 20000);
  describe("Test POST /v1/auth/register", () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: "passwordhere1",
      };
    });

    // test("should return 201 and successfully register if the payload is valid", async () => {
    //   const res = await request(app)
    //     .post("/v1/auth/register")
    //     .send(newUser)
    //     .expect(httpStatus.CREATED);

    //   expect(res.body.user).not.toHaveProperty("password");
    //   expect(res.body.user).toEqual({
    //     id: expect.anything(),
    //     name: newUser.name,
    //     email: newUser.email,
    //     role: "user",
    //     isEmailVerified: false,
    //   });

    //   const dbUser = await User.findById(res.body.user.id);
    //   console.log("dbUser", dbUser);

    //   expect(dbUser).toBeDefined();
    //   expect(dbUser.password).not.toBe(newUser.password);
    //   expect(dbUser).toMatchObject({
    //     name: newUser.name,
    //     email: newUser.email,
    //     role: "user",
    //     isEmailVerified: false,
    //   });
    //   // TODO: add test to expect tokens to be received
    // });

    test("should return 400 error if email is invalid", async () => {
      newUser.email = "invalid-email";
      const res = await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if email is already used", async () => {
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.CREATED);
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 if password length is less than 8 chars', async () => {
        newUser.password = 'pass'
        await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 if password does not contain letters and numbers', async () => {
        newUser.password = '12345678'
        await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
