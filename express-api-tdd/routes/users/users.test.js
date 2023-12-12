const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const UserModel = require("./user.model");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyMzg5MzA0LCJleHAiOjM2MDAxNzAyMzg5MzA0fQ.kAO-9keaTy7dJAjcj1zKU1AmXDH6SUVmbhZh_Rz8p4w";
describe("[Route::User]", () => {
  // let UserModel;
  beforeAll(() => {
    return db.sequelize.sync().then(async () => {
      await UserModel.create({
        name: "filipe",
        email: "filipemotasa@hotmail.com",
        password: "123456",
      });
    });
  });

  it("GET /api/users -> array", () => {
    return request(app)
      .get("/api/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
              }),
            ]),
          })
        );
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  it("POST /api/users -> creates User object", () => {
    return request(app)
      .post("/api/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        name: "pi",
        email: "user@example10.com",
        password: "123456",
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.objectContaining({
              token: expect.any(String),
            }),
          })
        );
      });
  });

  it("POST /api/users -> without required param", () => {
    return Promise.all([
      request(app)
        .post("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .send({
          name: "pi",
          email: "user@example.com1",
          password: 123456,
        })
        .expect(402),
      request(app)
        .post("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .send({
          name: "pi",
          email: "user@example.com2",
        })
        .expect(402),
      request(app)
        .post("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .send({
          name: "pi",
          password: "123456",
        })
        .expect(402),
    ]);
  });
  it("POST /api/users -> with duplicated unique param", () => {
    return request(app)
      .post("/api/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        name: "pi",
        email: "filipemotasa@hotmail.com",
        password: "123456",
      })
      .expect(404);
  });

  it("POST /api/users/login -> with correct login", () => {
    return request(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        email: "filipemotasa@hotmail.com",
        password: "123456",
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.objectContaining({
              token: expect.any(String),
            }),
          })
        );
      });
  });

  it("POST /api/users/login -> with wrong login", () => {
    return request(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        email: "filipemotasa@hotmail.com",
        password: "12345",
      })
      .expect(500)
  
  });
  it("POST /api/users/login -> with wrong email", () => {
    return request(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        email: "filipemotasa@hotmail.co",
        password: "123456",
      })
      .expect(500)
  
  });
 
});
