"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeData",
      });
      Schedule.belongsTo(models.User, {
        foreignKey: "employer_id",
        targetKey: "id",
        as: "employerData",
      });
      Schedule.belongsTo(models.Job, {
        foreignKey: "jobTitle",
        targetKey: "title",
        as: "titleData",
      });
    }
  }
  Schedule.init(
    {
      // id: DataTypes.INTEGER,
      jobTitle: DataTypes.STRING,
      currentNumber: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      employer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
