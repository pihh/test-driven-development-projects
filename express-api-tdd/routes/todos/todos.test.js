const request = require("supertest");
const app = require("../../app");
const db = require("../../db");

describe("[Route::Todo]", () => {
  let TodoModel;
  beforeAll(() => {
    return db.sequelize.sync().then(async () => {
      TodoModel = db.sequelize.models.Todo;
      await TodoModel.create({ name: "first_task", completed: false });
      await TodoModel.create({ name: "second_task", completed: false });
    });
  });

  it("GET /todos -> array", () => {
    return request(app)
      .get("/todos")
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

  it("POST /todos -> creates todo object", () => {
    return request(app)
      .post("/todos")
      .set("Accept", "application/json")
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
            }),
          })
        );
      });
  });
  
  it("POST /todos -> without name", () => {
    return request(app)
      .post("/todos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        completed: false,
      })
      .expect(402)
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


  it("GET /todos/id -> todo object by ID", () => {
    return request(app)
      .get("/todos/1")
      .set("Accept", "application/json")
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
  it("GET /todos/non-existing-id -> 404", () => {
    return request(app)
      .get("/todos/9999999999999999999")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
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

  it("PATCH /todos/id -> updates todo object by ID", () => {
    return request(app)
      .patch("/todos/2")
      .set("Accept", "application/json")
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
      });
  });
  it("DELETE /todos/id -> deletes todo object by ID", () => {
    return request(app)
      .delete("/todos/1")
      .set("Accept", "application/json")
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
