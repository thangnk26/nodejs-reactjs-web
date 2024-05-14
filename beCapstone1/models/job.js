"use strict";
const { Model } = require("sequelize");
const applicationDetail = require("./applicationDetail");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Allcode, {
        foreignKey: "location_id",
        targetKey: "keyMap",
        as: "locationData",
      });
      Job.belongsTo(models.Allcode, {
        foreignKey: "job_shift",
        targetKey: "keyMap",
        as: "jobshiftData",
      });
      Job.belongsTo(models.Allcode, {
        foreignKey: "job_type",
        targetKey: "keyMap",
        as: "jobtypeData",
      });
      Job.hasMany(models.Schedule, {
        foreignKey: "jobTitle",
        as: "titleData",
      });
      Job.hasMany(models.ApplicationDetail, {
        foreignKey: "job_id",
        as: "jobApplyData",
      });
    }
  }
  Job.init(
    {
      // id: DataTypes.INTEGER,
      company: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      jobCategory_id: DataTypes.STRING,
      location_id: DataTypes.STRING,
      employer_id: DataTypes.INTEGER,
      job_type: DataTypes.STRING,
      job_salary: DataTypes.STRING,
      job_skill: DataTypes.STRING,
      job_requirement: DataTypes.STRING,
      job_position: DataTypes.STRING,
      job_start_date: DataTypes.DATE,
      job_finish_date: DataTypes.DATE,
      job_expiration_date: DataTypes.DATE,
      job_shift: DataTypes.STRING,
      quality: DataTypes.NUMBER,
      job_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
