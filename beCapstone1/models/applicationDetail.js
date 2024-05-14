"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ApplicationDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ApplicationDetail.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeDataApply",
      });
      ApplicationDetail.belongsTo(models.User, {
        foreignKey: "seeker_id",
        targetKey: "id",
        as: "seekerData",
      });

      ApplicationDetail.belongsTo(models.Applicant, {
        foreignKey: "seekerApply_id",
        targetKey: "id",
        as: "seekerApplyData",
      });
    }
  }
  ApplicationDetail.init(
    {
      // id: DataTypes.INTEGER,
      statusId: DataTypes.STRING,
      seeker_id: DataTypes.INTEGER,
      seekerApply_id: DataTypes.INTEGER,
      job_id: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ApplicationDetail",
    }
  );
  return ApplicationDetail;
};
