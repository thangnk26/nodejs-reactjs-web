"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "keyMap",
      });
      User.hasMany(models.Schedule, {
        foreignKey: "id",
        as: "employerData",
      });
      User.hasMany(models.ApplicationDetail, {
        foreignKey: "seeker_id",
        as: "seekerData",
      });
     
    }
  }
  User.init(
    {
      // id: DataTypes.INTEGER,
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      numberphone: DataTypes.STRING,
      roleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
