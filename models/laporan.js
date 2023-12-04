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
    }
  }
  Laporan.init({
    customerId: DataTypes.INTEGER,
    transaksiId: DataTypes.INTEGER,
    nameMenu: DataTypes.STRING,
    pemasukan: DataTypes.INTEGER,
    modal: DataTypes.INTEGER,
    laba: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Laporan',
  });
  return Laporan;
};