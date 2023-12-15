const db = require("./db");
const fs = require("fs");
const path = require("path");
const RoleModel = require("./resources/roles/role.model");
const UserModel = require("./resources/users/user.model");
const TodoModel = require("./resources/todos/todo.model");

require('./resources/relationships');

const setup = async function () {

  await db.sequelize.sync();
    async function seed() {
      const RoleData = JSON.parse(
        fs.readFileSync(path.join(__dirname, "/resources/roles/roles.json"), {
          encoding: "utf8",
        })
      );
      const UserData = JSON.parse(
        fs.readFileSync(path.join(__dirname, "/resources/users/users.json"), {
          encoding: "utf8",
        })
      );
      const TodoData = JSON.parse(
        fs.readFileSync(path.join(__dirname, "/resources/todos/todos.json"), {
          encoding: "utf8",
        })
      );

      for (let role of RoleData) {
        try {
          await RoleModel.create({
            ...role,
          });
        } catch (ex) {
          
    
        }
      }

      for (let user of UserData) {
        try {
          const u = await UserModel.create(user);
        } catch (ex) {

        }
      }
      
      for (let todo of TodoData) {
        try {
          await TodoModel.create({
            ...todo,
          });
        } catch (ex) {

        }
      }
    
    
    }
    await seed();
};
module.exports = setup;
