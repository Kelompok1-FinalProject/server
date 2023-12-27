const { Customer, Transaksi, Laporan } = require("../models");
const jwt = require("jsonwebtoken");
const secret = "cafe-serumpunrasa";

class Controller {
  static async addCustomer(req, res, next) {
    try {
      const { name, noMeja } = req.body;
      const customer = await Customer.create({
        name,
        noMeja,
      });
      const newCustomer = jwt.sign(
        {
          id: customer.id,
          name: customer.name,
          noMeja: customer.noMeja,
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
      let statusPesanan = req.query["statusPesanan"];
      if (statusPesanan) {
        if (
          statusPesanan !== "Created" &&
          statusPesanan !== "In Progress" &&
          statusPesanan !== "Done"
        ) {
          statusPesanan = undefined;
        }
      } else {
        statusPesanan = undefined;
      }

      let customer;
      if (statusPesanan) {
        customer = await Customer.findAll({
          include: Transaksi,
          where: { statusPesanan },
        });
      }
      res.status(200).json({
        message: "Menampilkan semua data Customer.",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCustomerWaitingList(req, res, next) {
    try {
      const customer = await Customer.findAll({
        where: { statusPesanan: "In Progress" },
        include: Transaksi,
      });
      if (customer.length < 1) {
        res.status(200).json({
          message: "Menampilkan semua data Waiting List Customer.",
          data: "Tidak Ada Data Customer Pada Waiting List",
        });
      }
      res.status(200).json({
        message: "Menampilkan semua data Waiting List Customer.",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCustomerId(req, res, next) {
    try {
      const id = req.id;
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
  static async updatePayment(req, res, next) {
    try {
      const id = req.id;
      const { payment } = req.body;
      const findId = await Customer.findByPk(id);
      if (findId) {
        await Customer.update(
          {
            payment,
          },
          {
            where: { id },
          }
        );
        const customer = await Customer.findByPk(id);
        res.status(200).json({
          message: "Berhasil mengupdate Metode Pembayaran",
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
