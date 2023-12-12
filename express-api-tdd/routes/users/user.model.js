const db = require("../../db");
const { Op, Model, DataTypes } = require("sequelize");


class User extends Model{}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {type: DataTypes.STRING, required: true},
  email: {type: DataTypes.STRING, required: true, unique:true},
  password: {type: DataTypes.STRING, required: true},
},{
  sequelize:db.sequelize,
  modelName:"user",
  defaultScope: {
    attributes: {
      exclude: ['password','email']
    }
  }
})

module.exports = User