const request = require("supertest");
const faker = require("faker");
const httpStatus = require("http-status");
const app = require("../../src/app");
const setupTestDB = require("../utils/setupTestForDB");
const { User } = require("../../src/models/user.model");
const {
  userOne,
  userTwo,
  admin,
  insertUsers,
} = require("../fixtures/user.fixture");
const {
  userOneAccessToken,
  adminAccessToken,
} = require("../fixtures/token.fixture");

setupTestDB();

describe("User routes", () => {
  describe("POST /v1/users", () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
        role: "user",
      };
    });

    test("should return 201 and successfully create new user if data is ok", async () => {
      await insertUsers([admin]);

      const res = await request(app)
        .post("/v1/users")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).not.toHaveProperty("password");
      expect(res.body).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isEmailVerified: false,
        address: "-",
        city: "-",
        country: "-",
        description: "-",
        imageLink: "https://via.placeholder.com/150",
        managedBy: null,
        position: "employee",
        postalCode: "-",
      });

      const dbUser = await User.findById(res.body.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isEmailVerified: false,
      });
    });

    test("should be able to create an admin as well", async () => {
      await insertUsers([admin]);
      newUser.role = "admin";

      const res = await request(app)
        .post("/v1/users")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.role).toBe("admin");

      const dbUser = await User.findById(res.body.id);
      expect(dbUser.role).toBe("admin");
    });

    test("should return 401 error if access token is missing", async () => {
      await request(app)
        .post("/v1/users")
        .send(newUser)
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("should return 403 error if logged in user is not admin", async () => {
      await insertUsers([userOne]);

      await request(app)
        .post("/v1/users")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(newUser)
        .expect(httpStatus.FORBIDDEN);
    });

    test("should return 400 error if email is invalid", async () => {
      await insertUsers([admin]);
      newUser.email = "invalidEmail";

      await request(app)
        .post("/v1/users")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if email is already used", async () => {
      await insertUsers([admin, userOne]);
      newUser.email = userOne.email;

      await request(app)
        .post("/v1/users")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if password length is less than 8 characters", async () => {
      await insertUsers([admin]);
      newUser.password = "passwo1";

      await request(app)
        .post("/v1/users")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if password does not contain both letters and numbers", async () => {
      await insertUsers([admin]);
      newUser.password = "password";

      await request(app)
        .post("/v1/users")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      newUser.password = "1111111";

      await request(app)
        .post("/v1/users")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if role is neither user nor admin", async () => {
      await insertUsers([admin]);
      newUser.role = "invalid";

      await request(app)
        .post("/v1/users")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe("GET /v1/users", () => {
    test("should return 200 and apply the default query options", async () => {
      await insertUsers([userOne, userTwo, admin]);

      const res = await request(app)
        .get("/v1/users")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toEqual({
        id: userOne._id.toHexString(),
        name: userOne.name,
        email: userOne.email,
        role: userOne.role,
        isEmailVerified: userOne.isEmailVerified,
        address: "-",
        city: "-",
        country: "-",
        description: "-",
        imageLink: "https://via.placeholder.com/150",
        managedBy: null,
        position: "employee",
        postalCode: "-",
      });
    });

    test("should return 401 if access token is missing", async () => {
      await insertUsers([userOne, userTwo, admin]);

      await request(app)
        .get("/v1/users")
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("should return 403 if a non-admin is trying to access all users", async () => {
      await insertUsers([userOne, userTwo, admin]);

      await request(app)
        .get("/v1/users")
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.FORBIDDEN);
    });
  });
  describe("GET /v1/users/:userId", () => {
    test("should return 200 and the user object if data is ok", async () => {
      await insertUsers([admin]);

      const res = await request(app)
        .get(`/v1/users/${admin._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty("password");
      expect(res.body).toEqual({
        id: admin._id.toHexString(),
        email: admin.email,
        name: admin.name,
        role: admin.role,
        isEmailVerified: admin.isEmailVerified,
        address: "-",
        city: "-",
        country: "-",
        description: "-",
        imageLink: "https://via.placeholder.com/150",
        managedBy: null,
        position: "employee",
        postalCode: "-",
        
      });
    });

    test("should return 401 error if access token is missing", async () => {
      await insertUsers([userOne]);

      await request(app)
        .get(`/v1/users/${userOne._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("should return 403 error if user is trying to get another user", async () => {
      await insertUsers([userOne, userTwo]);

      await request(app)
        .get(`/v1/users/${userTwo._id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.FORBIDDEN);
    });

    test("should return 200 and the user object if admin is trying to get another user", async () => {
      await insertUsers([userOne, admin]);

      await request(app)
        .get(`/v1/users/${userOne._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);
    });

    test("should return 400 error if userId is not a valid mongo id", async () => {
      await insertUsers([admin]);

      await request(app)
        .get("/v1/users/invalidId")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 404 error if user is not found", async () => {
      await insertUsers([admin]);

      await request(app)
        .get(`/v1/users/${userOne._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /v1/users/:userId", () => {
    test("should return 204 if data is ok", async () => {
      await insertUsers([admin]);

      await request(app)
        .delete(`/v1/users/${admin._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      const dbUser = await User.findById(admin._id);
      expect(dbUser).toBeNull();
    });

    test("should return 401 error if access token is missing", async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete(`/v1/users/${userOne._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("should return 403 error if user is trying to delete another user", async () => {
      await insertUsers([userOne, userTwo]);

      await request(app)
        .delete(`/v1/users/${userTwo._id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.FORBIDDEN);
    });

    test("should return 204 if admin is trying to delete another user", async () => {
      await insertUsers([userOne, admin]);

      await request(app)
        .delete(`/v1/users/${userOne._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);
    });

    test("should return 400 error if userId is not a valid mongo id", async () => {
      await insertUsers([admin]);

      await request(app)
        .delete("/v1/users/invalidId")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 404 error if user already is not found", async () => {
      await insertUsers([admin]);

      await request(app)
        .delete(`/v1/users/${userOne._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("PATCH /v1/users/:userId", () => {
    test("should return 200 and successfully update user if data is ok", async () => {
      await insertUsers([admin]);
      const updateBody = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: "newPassword1",
      };

      const res = await request(app)
        .patch(`/v1/users/${admin._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty("password");
      expect(res.body).toEqual({user: {
        id: admin._id.toHexString(),
        name: updateBody.name,
        email: updateBody.email,
        role: "admin",
        isEmailVerified: false,
        address: "-",
        city: "-",
        country: "-",
        description: "-",
        imageLink: "https://via.placeholder.com/150",
        managedBy: null,
        position: "employee",
        postalCode: "-",
      }});

      const dbUser = await User.findById(admin._id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(updateBody.password);
      expect(dbUser).toMatchObject({
        name: updateBody.name,
        email: updateBody.email,
        role: "admin",
      });
    });

    test("should return 401 error if access token is missing", async () => {
      await insertUsers([userOne]);
      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/v1/users/${userOne._id}`)
        .send(updateBody)
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("should return 403 if user is updating another user", async () => {
      await insertUsers([userOne, userTwo]);
      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/v1/users/${userTwo._id}`)
        .set("Authorization", `Bearer ${userOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.FORBIDDEN);
    });

    test("should return 200 and successfully update user if admin is updating another user", async () => {
      await insertUsers([userOne, admin]);
      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/v1/users/${userOne._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);
    });

    test("should return 404 if admin is updating another user that is not found", async () => {
      await insertUsers([admin]);
      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/v1/users/${userOne._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.NOT_FOUND);
    });

    test("should return 400 error if userId is not a valid mongo id", async () => {
      await insertUsers([admin]);
      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/v1/users/invalidId`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 if email is invalid", async () => {
      await insertUsers([admin]);
      const updateBody = { email: "invalidEmail" };

      await request(app)
        .patch(`/v1/users/${admin._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 if email is already taken", async () => {
      await insertUsers([admin, userTwo]);
      const updateBody = { email: userTwo.email };

      await request(app)
        .patch(`/v1/users/${admin._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should not return 400 if email is my email", async () => {
      await insertUsers([admin]);
      const updateBody = { email: admin.email };

      await request(app)
        .patch(`/v1/users/${admin._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);
    });

    test("should return 400 if password length is less than 8 characters", async () => {
      await insertUsers([admin]);
      const updateBody = { password: "passwo1" };

      await request(app)
        .patch(`/v1/users/${admin._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 if password does not contain both letters and numbers", async () => {
      await insertUsers([admin]);
      const updateBody = { password: "password" };

      await request(app)
        .patch(`/v1/users/${admin._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);

      updateBody.password = "11111111";

      await request(app)
        .patch(`/v1/users/${admin._id}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
