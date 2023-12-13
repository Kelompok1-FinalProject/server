const { Customer, Laporan } = require("../models");

class Controller {
  static async getLaporan(req, res, next) {
    try {
      const laporan = await Customer.findAll({
        include: Laporan,
        where: { statusBayar: "Done", statusPesanan: "Done" },
      });
      res.status(200).json({
        message: "Menampilkan semua data Laporan.",
        data: laporan,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getLaporanId(req, res, next) {
    const id = Number(req.params["id"]);
    try {
      const laporan = await Customer.findOne({
        where: { id },
        include: Laporan,
      });
      if (laporan) {
        res.status(200).json({
          message: "Menampilkan data Laporan berdasarkan Id.",
          data: laporan,
        });
      } else {
        throw new Error(`Tidak ada Laporan dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
