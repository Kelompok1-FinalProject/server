const { Customer, Transaksi, Menu } = require("../models");

class Controller {
  static async addTransaksi(req, res, next) {
    try {
      const { menuId, jumlahOrder } = req.body;
      const customerId = Number(req.params["id"]);
      const customer = await Customer.findByPk(customerId);
      const menu = await Menu.findByPk(menuId);
      const harga = menu.harga * jumlahOrder;
      const transaksi = await Transaksi.create({
        customerId: customerId,
        menuId,
        nameMenu: menu.name,
        jumlahOrder,
        totalPembayaran: harga,
      });
      // Menambah total pesanan di objek Customer
      const updateTotalHarga = customer.totalPembayaran + harga;
      await Customer.update(
        {
          totalPembayaran: updateTotalHarga,
        },
        {
          where: {
            id: customerId,
          },
        }
      );
      res.status(201).json(transaksi);
    } catch (error) {
      next(error);
    }
  }
  static async getAllTransaksi(req, res, next) {
    try {
      const allTransaksi = await Transaksi.findAll({attributes: {
        exclude: [
          "customerId",
          "menuId",
          "createdAt",
          "updatedAt",
          "CustomerId",
        ],
      },
    });
      return res.status(200).json(allTransaksi);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  static async getTransaksiId(req, res, next) {
    try {
      const customerId = Number(req.params["id"]);
      const transactions = await Transaksi.findAll({
        where: { customerId: customerId },
        attributes: {
          exclude: [
            "customerId",
            "menuId",
            "createdAt",
            "updatedAt",
            "CustomerId",
          ],
        },
      });
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }
  static async updateTransaksi(req, res, next) {
    try {
      const { menuId, jumlahOrder } = req.body;
      const orderId = Number(req.params["id"]);
      const order = await Transaksi.findOne({ where: { id: orderId } });
      const customer = await Customer.findOne({
        where: { id: order.customerId },
      });
      const menu = await Menu.findOne({
        where: { id: menuId },
      });

      if (order && customer) {
        const beforeTotalPembayaran = order.totalPembayaran;
        const updateTotalPembayaran = menu.harga * jumlahOrder;
        const totalPembayaran = beforeTotalPembayaran + updateTotalPembayaran;

        await Transaksi.update(
          {
            menuId: menuId,
            nameMenu: menu.name,
            jumlahOrder: jumlahOrder,
            totalPembayaran: totalPembayaran,
          },
          { where: { id: orderId } }
        );

        const beforeTotalHarga = customer.totalPembayaran - beforeTotalPembayaran;
        const updateTotalHarga = beforeTotalHarga + totalPembayaran;

        await Customer.update(
          {
            totalPembayaran: updateTotalHarga,
          },
          { where: { id: order.customerId } }
        );

        res.status(200).json(`Order dengan id ${orderId} berhasil diupdate`);
      } else {
        res.status(404).json({ error: `Tidak ada Order dengan ID ${orderId}` });
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteTransaksi(req, res, next) {
    try {
      const orderId = Number(req.params["id"]);
      const order = await Transaksi.findOne({ where: { id: orderId } });
      const customer = await Customer.findOne({
        where: { id: order.customerId },
      });
      if (order && customer) {
        const updateTotalHarga = customer.totalPembayaran - order.totalPembayaran;
        await Customer.update(
          {
            totalPembayaran: updateTotalHarga,
          },
          { where: { id: order.customerId } }
        );
        await Transaksi.destroy({
          where: {
            id: orderId,
          },
        });
        res.status(200).json(`Order dengan id ${orderId} berhasil dihapus`);
      } else {
        res.status(404).json({ error: `Tidak ada Order dengan id ${orderId}` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;