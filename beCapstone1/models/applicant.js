"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Applicant.hasMany(models.ApplicationDetail, {
        foreignKey: "seekerApply_id",
        as: "seekerApplyData",
      });
    }
  }
  Applicant.init(
    {
      seeker_id: DataTypes.INTEGER,
      cv_name: DataTypes.STRING,
      address: DataTypes.STRING,
      birthday: DataTypes.DATE,
      gender: DataTypes.BOOLEAN,
      education: DataTypes.STRING,
      certication: DataTypes.STRING,
      experience: DataTypes.STRING,
      skills: DataTypes.STRING,
      career: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Applicant",
    }
  );
  return Applicant;
};
