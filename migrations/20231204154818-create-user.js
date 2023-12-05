'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          len: [3, 20],
        },
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        isEmail: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          len: [8, 20],
        },
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["Owner", "Kasir", "Pelayan"],
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaulValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};