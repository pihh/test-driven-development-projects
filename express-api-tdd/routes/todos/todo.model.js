const sequelize = require("../../db");
const { Op, Model, DataTypes } = require("sequelize");




module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("Todo", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
  });

  return Todo;
};