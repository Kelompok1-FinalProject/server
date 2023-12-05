'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laporans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      transaksiId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Transaksis",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nameMenu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pemasukan: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      modal: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      laba: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          isNonNegative(value) {
            if (value < 0) {
              throw new Error("Nilai laba harus non-negatif.");
            }
          },
        },
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
    await queryInterface.dropTable('Laporans');
  }
};