
const {  DataTypes } = require("sequelize");
const db = require("../db");
const User = require("./users/user.model");
const Role = require("./roles/role.model");
const Todo = require("./todos/todo.model");

User.belongsTo(Role, {
   foreignKey: "role_id",
   as: "role",
});

User.hasMany(Todo);
Todo.belongsTo(User);
