const db = require("../../config/db");


const { Model, DataTypes} = require("sequelize");

class Role extends Model {
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, required: true, unique: true },
    key: { type: DataTypes.STRING, required: true, unique: true },
  },
  {
    sequelize: db.sequelize,
    modelName: "Role",

     setterMethods: {
       id: function (value) {
         if (!this.isNewRecord) {
           throw new ValidationError(null, [
             new ValidationErrorItem(
               "readonly",
               "id may not be set",
               "id",
               value
             ),
           ]);
         }
       },
     },
  }
);

module.exports = Role;
