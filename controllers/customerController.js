const { Customer, Transaction } = require("../models");
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
      const token = jwt.sign(
        {
          id: customer.id,
          name: customer.name,
          noMeja: customer.noMeja,
          totalPembayaran: customer.totalPembayaran,
        },
        secret
      );
      res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  }
  static async getCustomer(req, res, next) {
    try {
      const customer = await Customer.findAll({
        include: Transaction,
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
          include: Transaction,
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
            statusPesan: "In Progress",
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
      const { statusPesan } = req.body;
      let id = Number(req.params["id"]);
      const findId = await Customer.findByPk(id);
      console.log(findId);
      if (findId) {
        await Customer.update(
          {
            statusPesan,
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