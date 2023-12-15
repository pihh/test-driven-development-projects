const db = require("./db");
const fs = require("fs");
const path = require("path");
const RoleModel = require("./routes/roles/role.model");
const UserModel = require("./routes/users/user.model");
const TodoModel = require("./routes/todos/todo.model");



const setup = async function () {

  await db.sequelize.sync();
    async function seed() {
      const RoleData = JSON.parse(
        fs.readFileSync(path.join(__dirname, "/routes/roles/roles.json"), {
          encoding: "utf8",
        })
      );
      const UserData = JSON.parse(
        fs.readFileSync(path.join(__dirname, "/routes/users/users.json"), {
          encoding: "utf8",
        })
      );
      const TodoData = JSON.parse(
        fs.readFileSync(path.join(__dirname, "/routes/todos/todos.json"), {
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
