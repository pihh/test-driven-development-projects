const request = require("supertest");
const User = require("../resources/users/user.model");
const app = require("../app");
const db = require("../config/db");
const setup = require("../config/setup");
describe("Permissions middleware", function () {
  let adminToken;
  let editorToken;
  let userToken;
  beforeAll(() => {
    return db.sequelize.sync().then(async () => {
      await setup();
      let admin = await User.findByPk(3);
      let editor = await User.findByPk(2);
      let user = await User.findByPk(1);

      adminToken = admin.dataValues.token;
      editorToken = editor.dataValues.token;
      userToken = user.dataValues.token;
    });
  });
  describe("Admin", () => {
    it("should only allow admin requests", () => {
      return request(app)
        .get("/test-permission-admin")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + adminToken)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("should block editor requests", () => {
      return request(app)
        .get("/test-permission-admin")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + editorToken)
        .expect("Content-Type", /json/)
        .expect(401);
    });
    it("should block user requests", () => {
        return request(app)
          .get("/test-permission-admin")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + userToken)
          .expect("Content-Type", /json/)
          .expect(401);
      });
  });

  describe("Editor", () => {
    it("should allow admin requests", () => {
      return request(app)
        .get("/test-permission-editor")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + adminToken)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("should allow editor requests", () => {
        return request(app)
          .get("/test-permission-editor")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + editorToken)
          .expect("Content-Type", /json/)
          .expect(200);
      });

    it("should block user requests", () => {
        return request(app)
          .get("/test-permission-editor")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + userToken)
          .expect("Content-Type", /json/)
          .expect(401);
      });
  });

  /*
    it('should only allow admin requests',()=>{
        
        return User.findByPk(3).then(user => {
            token = user.dataValues.token;
            
            return request(app)
            .get("/test-permission-admin")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .expect("Content-Type", /json/)
            .send({
                name: "do dishes",
            })
            .expect(200)
        })
    })
    it('should only allow editor requests',()=>{
            return User.findBy
    })
    */
});
