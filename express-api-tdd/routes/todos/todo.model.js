const db = require("../../db");
const { Op, Model, DataTypes } = require("sequelize");


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
  modelName:"todo"
})

module.exports = Todo