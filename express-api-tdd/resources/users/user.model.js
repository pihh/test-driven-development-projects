const db = require("../../config/db");
const {  Model, DataTypes } = require("sequelize");



class User extends Model{

}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {type: DataTypes.STRING, required: true},
  email: {type: DataTypes.STRING, required: true, unique:true},
  password: {type: DataTypes.STRING, required: true},
  role_id: DataTypes.INTEGER,
  token: DataTypes.STRING,
},{
  sequelize:db.sequelize,
  modelName:"User",
  defaultScope: {
    attributes: {
      exclude: [
        'password',
        'email',

      ]
    }
  }
})



module.exports = User