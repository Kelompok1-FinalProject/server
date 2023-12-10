const { Transaksi } = require("../models");

async function isOwnTransaksi(req, res, next) {
  try {
    const id = req.id;
    const param = req.params;
    const transaksiId = param.id;

    const transaksi = await Transaksi.findByPk(transaksiId);
    if (transaksi && transaksi.customerId === id) {
      return next();
    } else {
      throw new Error("TRANSAKSI INI BUKAN PUNYA ANDA");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = isOwnTransaksi;
