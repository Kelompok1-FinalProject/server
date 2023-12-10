"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      Menu.hasMany(models.Transaksi, { foreignKey: "menuId" });
    }
  }
  Menu.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          min: 10,
        },
      },
      gambar: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kategori: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["makanan", "minuman"],
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["private", "public"],
        defaultValue: "public",
      },
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
