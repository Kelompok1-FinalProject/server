'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Laporan.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Laporan.belongsTo(models.Transaksi, { foreignKey: 'transaksiId' });
    }
  }
  Laporan.init({
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
        key : "id",
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
      defaultValue: 0,
      validate: {
        isNonNegative(value) {
          if (value < 0) {
            throw new Error("Nilai laba harus non-negatif.");
          }
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Laporan',
  });
  return Laporan;
};