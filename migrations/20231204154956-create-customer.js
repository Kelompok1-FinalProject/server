'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      noMeja: {
        type: Sequelize.INTEGER
      },
      payment: {
        type: Sequelize.ENUM
      },
      totalPembayaran: {
        type: Sequelize.INTEGER
      },
      totalLaba: {
        type: Sequelize.INTEGER
      },
      statusBayar: {
        type: Sequelize.ENUM
      },
      statusPesanan: {
        type: Sequelize.ENUM
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
    await queryInterface.dropTable('Customers');
  }
};