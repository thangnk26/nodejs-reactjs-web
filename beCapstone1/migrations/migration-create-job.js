"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      jobCategory_id: {
        type: Sequelize.STRING,
      },
      location_id: {
        type: Sequelize.STRING,
      },
      employer_id: {
        type: Sequelize.INTEGER,
      },
      job_type: {
        type: Sequelize.STRING,
      },
      job_skill: {
        type: Sequelize.STRING,
      },
      job_requirement: {
        type: Sequelize.STRING,
      },
      job_position: {
        type: Sequelize.STRING,
      },
      job_salary: {
        type: Sequelize.STRING,
      },
      job_start_date: {
        type: Sequelize.DATE,
      },
      job_finish_date: {
        type: Sequelize.DATE,
      },
      job_expiration_date: {
        type: Sequelize.DATE,
      },
      job_shift: {
        type: Sequelize.STRING,
      },
      quality: {
        type: Sequelize.INTEGER,
      },
      job_status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("jobs");
  },
};
