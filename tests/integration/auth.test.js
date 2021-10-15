const request = require("supertest");
const httpStatus = require("http-status");
const moment = require("moment");
const config = require("../../src/config/getEnv");
const app = require("../../src/app");
const faker = require("faker");
const setupTestForDB = require("../utils/setupTestForDB");
const Token = require("../../src/models/token.model");
const { User } = require("../../src/models/user.model");
const { userOne, insertUsers } = require("../fixtures/user.fixture");
const { tokenService } = require("../../src/services");
const tokenTypes = require("../../src/config/token.type");
const { refreshAuth } = require("../../src/services/auth.service");

setupTestForDB();

describe("Test Auth routes", () => {
  describe("Test POST /v1/auth/register", () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: "passwordhere1",
      };
    });

    test("should return 201 and successfully register if the payload is valid", async () => {
      const res = await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.user).not.toHaveProperty("password");
      expect(res.body.user).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        role: "user",
        isEmailVerified: false,
      });

      const dbUser = await User.findById(res.body.user.id);

      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({
        name: newUser.name,
        email: newUser.email,
        role: "user",
        isEmailVerified: false,
      });

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    test("should return 400 error if email is invalid", async () => {
      newUser.email = "invalid-email";
      const res = await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if email is already used", async () => {
      await new User(newUser).save();
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
    test("should return 400 if password length is less than 8 chars", async () => {
      newUser.password = "pass";
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
    test("should return 400 if password does not contain letters and numbers", async () => {
      newUser.password = "12345678";
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe("Test POST /v1/auth/login", () => {
    test("should return 200 and login user if email and pasword match", async () => {
      await new User(userOne).save();

      const payload = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app)
        .post("/v1/auth/login")
        .send(payload)
        .expect(httpStatus.OK);

      expect(res.body.user).toEqual({
        id: expect.anything(),
        name: userOne.name,
        email: userOne.email,
        role: userOne.role,
        isEmailVerified: userOne.isEmailVerified,
      });

      expect(res.body.tokens).toEqual({
        access: {
          token: expect.anything(),
          expires: expect.anything(),
        },
        refresh: {
          token: expect.anything(),
          expires: expect.anything(),
        },
      });
    });
    test("should return 401 is there is no user with this email", async () => {
      const payload = {
        email: userOne.email,
        password: userOne.password,
      };
      const res = await request(app)
        .post("/v1/auth/login")
        .send(payload)
        .expect(httpStatus.UNAUTHORIZED);
      expect(res.body).toEqual({
        code: httpStatus.UNAUTHORIZED,
        message: httpStatus[httpStatus.UNAUTHORIZED],
      });
    });
    test("should return 401 is there is no user with this password", async () => {
      await new User(userOne).save();
      const payload = {
        email: userOne.email,
        password: "passwordwrong123",
      };
      const res = await request(app)
        .post("/v1/auth/login")
        .send(payload)
        .expect(httpStatus.UNAUTHORIZED);
      expect(res.body).toEqual({
        code: httpStatus.UNAUTHORIZED,
        message: httpStatus[httpStatus.UNAUTHORIZED],
      });
    });
  });
  describe("Test POST /v1/auth/logout", () => {
    test("should return 204 if refresh token is valid", async () => {
      await insertUsers([userOne]);
      const expires = moment().add(config.jwt.refreshExpirationDays, "days");
      const refreshToken = tokenService.generateToken(
        userOne._id,
        expires,
        tokenTypes.REFRESH
      );
      await tokenService.saveToken(
        refreshToken,
        userOne._id,
        expires,
        tokenTypes.REFRESH
      );

      await request(app)
        .post("/v1/auth/logout")
        .send({ refreshToken })
        .expect(httpStatus.NO_CONTENT);

      const dbRefreshTokenDoc = await Token.findOne({ token: refreshToken });
      expect(dbRefreshTokenDoc).toBe(null);
    });
    test("should return 404 error if refresh token is missing from the request body", async () => {
      await request(app)
        .post("/v1/auth/logout")
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
    test("should return 404 error if refresh token is not found in te db", async () => {
      await request(app)
        .post("/v1/auth/logout")
        .send({ refreshToken: "sad" })
        .expect(httpStatus.NOT_FOUND);
    });
    test("should return 404 error if refresh token is blackListed", async () => {
      await insertUsers([userOne]);
      const expires = moment().add(config.jwt.refreshExpirationDays, "days");
      const refreshToken = tokenService.generateToken(
        userOne._id,
        expires,
        tokenTypes.REFRESH
      );
      await tokenService.saveToken(
        refreshToken,
        userOne._id,
        expires,
        tokenTypes.REFRESH,
        true
      );

      await request(app)
        .post("/v1/auth/logout")
        .send({ refreshToken })
        .expect(httpStatus.NOT_FOUND);
    });
  });
  describe("Test POST /v1/auth/refresh-tokens", () => {
    test("should return 200 and new auth tokens if refresh token is valid", async () => {
      const newUserPayload = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: "passwordhere1",
      };
      const registerResponse = await request(app)
        .post("/v1/auth/register")
        .send(newUserPayload)
        .expect(httpStatus.CREATED);
      const refreshToken = registerResponse.body.tokens.refresh.token;

      const refreshTokensResponse = await request(app)
        .post("/v1/auth/refresh-tokens")
        .send({ refreshToken })
        .expect(httpStatus.OK);

      expect(refreshTokensResponse.body).toEqual({
        access: {
          token: expect.anything(),
          expires: expect.anything(),
        },
        refresh: {
          token: expect.anything(),
          expires: expect.anything(),
        },
      });

      const dbRefreshTokenDoc = await Token.findOne({
        token: refreshTokensResponse.body.refresh.token,
      });
      expect(dbRefreshTokenDoc).toBeDefined();

      const dbRefreshTokenCount = await Token.countDocuments();
      expect(dbRefreshTokenCount).toBe(1);
    });
    test("should return 400 error if referh token is missing from request body", async () => {
      await request(app)
        .post("/v1/auth/refresh-tokens")
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
    test("should return 401 error if refreh token is signed using an invalid secret", async () => {
      await insertUsers([userOne]);
      const expires = moment().add(config.jwt.refreshExpiratonDays, "days");
      const refreshToken = tokenService.generateToken(
        userOne._id,
        expires,
        tokenTypes.REFRESH,
        "anothersecretkey"
      );
      await tokenService.saveToken(
        refreshToken,
        userOne._id,
        expires,
        tokenTypes.REFRESH
      );

      await request(app)
        .post("/v1/auth/refresh-tokens")
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });
    test("should return 401 error if refresh token is not found in DB", async () => {
      await insertUsers([userOne]);
      const expires = moment().add(config.jwt.refreshExpiratonDays, "days");
      const refreshToken = tokenService.generateToken(
        userOne._id,
        expires,
        tokenTypes.REFRESH
      );

      await request(app)
        .post("/v1/auth/refresh-tokens")
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });
    test("should return 401 error if refresh token is blacklisted", async () => {
      await insertUsers([userOne]);
      const expires = moment().add(config.jwt.refreshExpiratonDays, "days");
      const refreshToken = tokenService.generateToken(
        userOne._id,
        expires,
        tokenTypes.REFRESH
      );
      await tokenService.saveToken(
        refreshToken,
        userOne._id,
        expires,
        tokenTypes.REFRESH,
        true
      );

      await request(app)
        .post("/v1/auth/refresh-tokens")
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });
    test("should return 401 error if refersh token is expired", async () => {
      await insertUsers([userOne]);
      const expires = moment().subtract(1, "minutes");
      const refreshToken = tokenService.generateToken(
        userOne._id,
        expires,
        tokenTypes.REFRESH
      );
      await tokenService.saveToken(
        refreshToken,
        userOne._id,
        expires,
        tokenTypes.REFRESH,
        true
      );

      await request(app)
        .post("/v1/auth/refresh-tokens")
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });
    test("should return 401 error if user is not found", async () => {
      const expires = moment().add(config.jwt.refreshExpiratonDays, "days");
      const refreshToken = tokenService.generateToken(
        userOne._id,
        expires,
        tokenTypes.REFRESH
      );
      await tokenService.saveToken(
        refreshToken,
        userOne._id,
        expires,
        tokenTypes.REFRESH,
        true
      );

      await request(app)
        .post("/v1/auth/refresh-tokens")
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
