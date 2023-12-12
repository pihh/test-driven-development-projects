const request = require("supertest");
const app = require("./app");
const db = require("./db");

describe("[app.js]", () => {
  beforeAll(() => {
    return db.sequelize.sync();
  });
  it("should run", (done) => {
    
    request(app)
      .get("/app")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        // expect(response.status).toEqual(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            data: expect.any(Object),
          })
        );
        done();
      });
  });

  it("Not found -> should return a response with 404 status and response message type", (done) => {
    request(app)
      .get("/app/non-existent-route")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        // expect(response.status).toEqual(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
            data: expect.any(Object),
          })
        );
        done()
      });
  });
});
