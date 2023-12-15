const db = require("../../db");
const { Op, Model, DataTypes } = require("sequelize");
const User = require("../users/user.model");


class Todo extends Model{}

Todo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  completed: DataTypes.BOOLEAN,

},{
  sequelize:db.sequelize,
  modelName:"Todo"
})


module.exports = Todo