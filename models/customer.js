"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Transaksi, { foreignKey: "customerId" });
      Customer.hasMany(models.Laporan, { foreignKey: "customerId" });
    }
  }
  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 20],
        },
      },
      noMeja: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      payment: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Dana", "Qris", "Gopay"],
      },
      totalPembayaran: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalLaba: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      statusBayar: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Belum Bayar", "Done"],
        defaultValue: "Belum Bayar",
      },
      statusPesanan: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Created", "In Progress", "Done"],
        defaultValue: "Created",
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
