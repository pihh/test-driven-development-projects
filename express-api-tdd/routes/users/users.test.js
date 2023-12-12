const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const UserModel = require("./user.model");
const env = require("../../env");

let token = env.token
describe("[Route::User]", () => {
  
  beforeAll(() => {
    return db.sequelize.sync().then(async () => {
      await UserModel.create({
        name: "filipe",
        email: "filipemotasa@hotmail.com",
        password: "123456",
      });
    });
  });

  it("GET /api/users -> Array without private fields [email and password]", () => {
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
        expect(response.body.data[0]).not.toHaveProperty('password');
        expect(response.body.data[0]).not.toHaveProperty('email');
        
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
