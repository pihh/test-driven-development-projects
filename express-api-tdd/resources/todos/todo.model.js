const db = require("../../config/db");
const { Model, DataTypes } = require("sequelize");


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