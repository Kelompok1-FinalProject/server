"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          len: [3, 20],
        },
      },
      noMeja: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          min: 1, // Nomor meja harus lebih besar dari 0
        },
        defaultValue: 99,
      },
      payment: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["Cash", "Qris", "Transfer"],
      },
      totalPembayaran: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalLaba: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      statusBayar: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["Belum Bayar", "Done"],
        defaultValue: "Belum Bayar",
      },
      statusPesanan: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["Created", "In Progress", "Done"],
        defaultValue: "Created",
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
    await queryInterface.dropTable("Customers");
  },
};
