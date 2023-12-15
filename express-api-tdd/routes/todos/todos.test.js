const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const env = process.env;
const TodoModel = require("./todo.model");
const UserModel = require("../users/user.model");
const setup = require("../../setup");

describe("[Route::Todo]", () => {
  let token = env.TOKEN;
  // let TodoModel;
  beforeAll(() => {
    return db.sequelize.sync().then(async () => {
      await setup();

      try {
        token = await UserModel.findByPk(1);
        token = token.dataValues.token; //.dataValues.token
      } catch (ex) {
      
      }
    });
  });

  it("GET /api/todos -> array", () => {
    return request(app)
      .get("/api/todos")
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
                completed: expect.any(Boolean),
              }),
            ]),
          })
        );
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  it("POST /api/todos -> creates todo object", () => {
    return request(app)
      .post("/api/todos")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .send({
        name: "do dishes",
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
              UserId: expect.any(Number),
            }),
          })
        );
      });
  });

  it("POST /api/todos -> without name", () => {
    return request(app)
      .post("/api/todos")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .send({
        completed: false,
      })
      .expect(402);
    // .then((response) => {
    //   expect(response.body).toEqual(
    //     expect.objectContaining({
    //       success: true,
    //       data: expect.objectContaining({
    //         id: expect.any(Number),
    //         name: expect.any(String),
    //         completed: expect.any(Boolean),
    //       }),
    //     })
    //   );
    // });
  });

  it("GET /api/todos/id -> todo object by ID", () => {
    return request(app)
      .get("/api/todos/1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          })
        );
      });
  });
  it("GET /api/todos/non-existing-id -> 404", () => {
    return request(app)
      .get("/api/todos/9999999999999999999")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
    // .then((response) => {
    //   expect(response.body).toEqual(
    //     expect.objectContaining({
    //       success: true,
    //       data: expect.objectContaining({
    //         id: expect.any(Number),
    //         name: expect.any(String),
    //         completed: expect.any(Boolean),
    //       }),
    //     })
    //   );
    // });
  });

  it("PATCH /api/todos/id -> updates todo object by ID", () => {
    return request(app)
      .patch("/api/todos/2")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .send({
        name: "patched request",
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.arrayContaining([expect.any(Number)]),
          })
        );
        return request(app)
          .get("/api/todos/2")
          .then((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                success: true,
                data: expect.objectContaining({
                  name: "patched request",
                }),
              })
            );
          });
      });
  });

  it("PATCH /api/todos/id -> updates todo object by ID", () => {
    return request(app)
      .patch("/api/todos/2")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .send({
        completed: true,
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.arrayContaining([expect.any(Number)]),
          })
        );
        return request(app)
          .get("/api/todos/2")
          .then((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                success: true,
                data: expect.objectContaining({
                  completed: true,
                }),
              })
            );
          });
      });
  });
  it("PATCH /api/todos/id -> updates todo object by ID", () => {
    return request(app)
      .patch("/api/todos/2")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .send({
        id: 10,
      })
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
            data: expect.objectContaining({
              message: expect.any(String),
            }),
          })
        );
        return request(app)
          .get("/api/todos/2")
          .then((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                success: true,
                data: expect.objectContaining({
                  id: 2,
                }),
              })
            );
          });
      });
  });
  it("DELETE /api/todos/id -> deletes todo object by ID", () => {
    return request(app)
      .delete("/api/todos/1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
          })
        );
      });
  });
});
