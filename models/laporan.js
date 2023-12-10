"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    static associate(models) {
      Laporan.belongsTo(models.Customer, { foreignKey: "customerId" });
      Laporan.belongsTo(models.Transaksi, { foreignKey: "transaksiId" });
    }
  }
  Laporan.init(
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
      transaksiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Transaksis",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nameMenu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pemasukan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      modal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      laba: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNonNegative(value) {
            if (value < 0) {
              throw new Error("Nilai laba harus non-negatif.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Laporan",
    }
  );
  return Laporan;
};
