const { where } = require("sequelize");
const { Customer, Transaksi, Menu, Laporan } = require("../models");
const modalMenu = 0.7;

class Controller {
  static async addTransaksi(req, res, next) {
    const body = req.body;
    const { menuId, jumlahOrder } = body;
    const customerId = Number(req.params["id"]);
    const customer = await Customer.findByPk(customerId);
    const menu = await Menu.findByPk(menuId);

    const totalPembayaran = menu.harga * jumlahOrder;
    const modal = totalPembayaran * modalMenu;
    const totalLaba = totalPembayaran - modal;

    const updatePembayaran = customer.totalPembayaran + totalPembayaran;
    const updateLaba = customer.totalLaba + totalLaba;

    try {
      const transaksi = await Transaksi.create({
        customerId,
        menuId,
        nameMenu: menu.name,
        jumlahOrder,
        totalPembayaran,
      });
      const laporan = await Laporan.create({
        customerId,
        transaksiId: transaksi.id,
        nameMenu: menu.name,
        pemasukan: totalPembayaran,
        modal,
        laba: totalLaba,
      });
      if (transaksi && laporan) {
        await Customer.update(
          {
            totalPembayaran: updatePembayaran,
            totalLaba: updateLaba,
          },
          {
            where: {
              id: customerId,
            },
          }
        );
      }
      res.status(201).json({
        message: "Berhasil menambah transaksi",
        data: transaksi,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getTransaksi(req, res, next) {
    try {
      const transaksi = await Transaksi.findAll({
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
      res.status(200).json({
        message: "Menampilkan semua transaksi",
        data: transaksi,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getTransaksiId(req, res, next) {
    try {
      const customerId = Number(req.params["id"]);
      const transaksi = await Transaksi.findAll({
        where: { customerId },
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
      res.status(200).json({
        message: `Menampilkan transaksi customer dengan customerId  ${customerId}`,
        data: transaksi,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateTransaksi(req, res, next) {
    const body = req.body;
    const { menuId, jumlahOrder } = body;
    const id = Number(req.params["id"]);
    const transaksi = await Transaksi.findByPk(id);
    const customer = await Customer.findOne({
      where: { id: transaksi.customerId },
    });
    const laporan = await Laporan.findOne({
      where: { id: transaksi.id },
    });
    const menu = await Menu.findByPk(menuId);

    try {
      if (transaksi && customer && menu) {
        const beforeHarga =
          customer.totalPembayaran - transaksi.totalPembayaran;
        const beforeLaba = customer.totalLaba - laporan.laba;

        const totalPembayaran = menu.harga * jumlahOrder;
        const modal = totalPembayaran * modalMenu;
        const totalLaba = totalPembayaran - modal;

        const updatePembayaran = beforeHarga + totalPembayaran;
        const updateLaba = beforeLaba + totalLaba;

        const updateTransaksi = await Transaksi.update(
          {
            menuId,
            nameMenu: menu.name,
            jumlahOrder,
            totalPembayaran,
          },
          { where: { id } }
        );
        const updateLaporan = await Laporan.update(
          {
            nameMenu: menu.name,
            pemasukan: totalPembayaran,
            modal,
            laba: totalLaba,
          },
          { where: { transaksiId: transaksi.id } }
        );
        if (updateTransaksi && updateLaporan) {
          await Customer.update(
            {
              totalPembayaran: updatePembayaran,
              totalLaba: updateLaba,
            },
            {
              where: {
                id: transaksi.customerId,
              },
            }
          );
        }
      }
      const viewTransaksi = await Transaksi.findByPk(id);
      res.status(200).json({
        message: "Berhasil mengupdate transaksi",
        data: viewTransaksi,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteTransaksi(req, res, next) {
    const id = Number(req.params["id"]);
    const transaksi = await Transaksi.findByPk(id);
    const customer = await Customer.findOne({
      where: { id: transaksi.customerId },
    });
    const laporan = await Laporan.findOne({
      where: { id: transaksi.id },
    });
    try {
      if (transaksi && customer && laporan) {
        const updateHarga =
          customer.totalPembayaran - transaksi.totalPembayaran;
        const updateLaba = customer.totalLaba - laporan.laba;
        const updateCustomer = await Customer.update(
          {
            totalPembayaran: updateHarga,
            totalLaba: updateLaba,
          },
          {
            where: { id: transaksi.customerId },
          }
        );
        if (updateCustomer) {
          await Laporan.destroy({ where: { id: transaksi.id } });
          await Transaksi.destroy({ where: { id } });
        }
      }
      res.status(200).json({
        message: "Berhasil menghapus transaksi",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
