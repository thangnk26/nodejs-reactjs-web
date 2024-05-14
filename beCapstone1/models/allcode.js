"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: "roleId" });

      Allcode.hasMany(models.Job, {
        foreignKey: "location_id",
        as: "locationData",
      });
      Allcode.hasMany(models.Job, {
        foreignKey: "job_shift",
        as: "jobshiftData",
      });
      Allcode.hasMany(models.Job, {
        foreignKey: "job_type",
        as: "jobtypeData",
      });
      Allcode.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });

      Allcode.hasMany(models.ApplicationDetail, {
        foreignKey: "timeType",
        as: "timeTypeDataApply",
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
