const { Customer, Transaksi } = require("../models");
const jwt = require("jsonwebtoken");
const secret = "cafe-serumpunrasa";

class Controller {
  static async postCustomer(req, res, next) {
    try {
      const { name, noMeja, payment } = req.body;
      const customer = await Customer.create({
        name,
        noMeja,
        payment,
      });
      const token = jwt.sign(
        {
          id: customer.id,
          name: customer.name,
          noMeja: customer.noMeja,
          totalPembayaran: customer.totalPembayaran,
        },
        secret
      );
      res.status(201).json({ message: "Berhasil menambahkan customer.", data:token});
      
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
      res.status(200).json(customer);
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
        res.status(200).json(customer);
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
      console.log(findId);
      if (findId) {
        await Customer.update(
          {
            statusBayar,
            statusPesanan: "In Progress",
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json(`Customer dengan id ${id} berhasil diupdate`);
      } else {
        throw new Error(`Tidak ada Customer dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateStatusPesan(req, res, next) {
    try {
      const { statusPesanan } = req.body;
      let id = Number(req.params["id"]);
      const findId = await Customer.findByPk(id);
      console.log(findId);
      if (findId) {
        await Customer.update(
          {
            statusPesanan,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json(`Customer dengan id ${id} berhasil diupdate`);
      } else {
        throw new Error(`Tidak ada Customer dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;