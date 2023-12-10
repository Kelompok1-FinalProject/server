const { Customer, Transaksi, Laporan } = require("../models");
const jwt = require("jsonwebtoken");
const secret = "cafe-serumpunrasa";

class Controller {
  static async addCustomer(req, res, next) {
    try {
      const { name, noMeja, payment } = req.body;
      const customer = await Customer.create({
        name,
        noMeja,
        payment,
      });
      const newCustomer = jwt.sign(
        {
          id: customer.id,
          name: customer.name,
          noMeja: customer.noMeja,
          totalPembayaran: customer.totalPembayaran,
          totalLaba: customer.totalLaba,
        },
        secret
      );
      res.status(201).json({
        message: "Customer baru berhasil dibuat, silahkan pilih Menu.",
        data: newCustomer,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCustomer(req, res, next) {
    try {
      const customer = await Customer.findAll({
        include: Transaksi,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json({
        message: "Menampilkan semua data Customer.",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCustomerId(req, res, next) {
    try {
      let id = Number(req.params["id"]);
      const findId = await Customer.findByPk(id);
      if (findId) {
        const customer = await Customer.findOne({
          where: { id },
          include: Transaksi,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
        res.status(200).json({
          message: "Menampilkan data Customer berdasarkan Id.",
          data: customer,
        });
      } else {
        throw new Error(`Tidak ada Customer dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateStatusBayar(req, res, next) {
    try {
      const { statusBayar } = req.body;
      let id = Number(req.params["id"]);
      const findId = await Customer.findByPk(id);
      if (findId) {
        await Customer.update(
          {
            statusBayar,
            statusPesanan: "In Progress",
          },
          {
            where: { id },
          }
        );
        const customer = await Customer.findByPk(id);
        res.status(200).json({
          message: "Berhasil mengupdate Status Bayar",
          data: customer,
        });
      } else {
        throw new Error(`Tidak ada Customer dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateStatusPesanan(req, res, next) {
    try {
      const { statusPesanan } = req.body;
      let id = Number(req.params["id"]);
      const findId = await Customer.findByPk(id);
      if (findId) {
        await Customer.update(
          {
            statusPesanan,
          },
          {
            where: {
              id,
            },
          }
        );
        const customer = await Customer.findByPk(id);
        res.status(200).json({
          message: "Berhasil mengupdate Status Pesanan",
          data: customer,
        });
      } else {
        throw new Error(`Tidak ada Customer dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
