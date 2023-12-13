"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaksi.hasMany(models.Laporan, { foreignKey: "transaksiId" });
      Transaksi.belongsTo(models.Customer, { foreignKey: "customerId" });
      Transaksi.belongsTo(models.Menu, { foreignKey: "menuId" });
    }
  }
  Transaksi.init(
    {
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Menus",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nameMenu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlahOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1, // Jumlah order tidak boleh kurang dari 1
        },
      },
      totalPembayaran: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaksi",
    }
  );
  return Transaksi;
};
