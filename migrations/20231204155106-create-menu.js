'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
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
          len: [3, 30],
        },
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          min: 10,
        },
      },
      gambar: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      harga: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      kategori: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["makanan", "minuman"],
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["private", "public"],
        defaultValue: "public",
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
    await queryInterface.dropTable('Menus');
  }
};