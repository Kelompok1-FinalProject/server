const { Menu } = require("../models");

class Controller {
  static async addMenu(req, res, next) {
    try {
      const body = req.body;
      const { name, description, gambar, harga, kategori } = body;
      const menu = await Menu.create({
        name,
        description,
        gambar,
        harga,
        kategori,
      });
      res.status(201).json({
        message: "Menu baru berhasil dibuat",
        data: menu,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getMenu(req, res, next) {
    try {
      const menu = await Menu.findAll();
      if (menu) {
        res.status(200).json({
          message: "Menampilkan List Menu",
          data: menu,
        });
      } else {
        throw new Error("Tidak ada Data pada List Menu");
      }
    } catch (error) {
      next(error);
    }
  }
  static async getMenuId(req, res, next) {
    try {
      const id = req.params["id"];
      const menu = await Menu.findByPk(id);
      if (menu) {
        res.status(200).json({
          message: `Menampilkan Menu dengan Id ${id}`,
          data: menu,
        });
      } else {
        throw new Error(`Tidak Menu dengan Id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async getMenuKategori(req, res, next) {
    try {
      const kategori = req.params["kategori"];
      if (kategori == "makanan" || kategori == "minuman") {
        const menu = await Menu.findAll({
          where: { kategori, status: "public" },
        });
        res.status(200).json({
          message: `Menampilkan List Menu Berdasarkan Katerogi ${kategori}`,
          data: menu,
        });
      } else {
        throw new Error(`Tidak ada Menu dengan kategori ${kategori}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateMenu(req, res, next) {
    try {
      const body = req.body;
      const { name, description, gambar, harga } = body;
      const id = Number(req.params["id"]);
      const findId = await Menu.findByPk(id);
      if (findId) {
        await Menu.update(
          {
            name,
            description,
            gambar,
            harga,
          },
          { where: { id } }
        );
        const menu = await Menu.findByPk(id);
        res.status(200).json({
          message: `Menu dengan id ${id} berhasil diupdate`,
          data: menu,
        });
      } else {
        throw new Error(`Tidak ada Menu dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateStatusMenu(req, res, next) {
    try {
      const body = req.body;
      const { status } = body;
      const id = Number(req.params["id"]);
      const findId = await Menu.findByPk(id);
      if (findId) {
        await Menu.update(
          {
            status,
          },
          { where: { id } }
        );
        const menu = await Menu.findByPk(id);
        res.status(200).json({
          message: `Menu dengan id ${id} berhasil diupdate`,
          data: menu,
        });
      } else {
        throw new Error(`Tidak ada Menu dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteMenu(req, res, next) {
    try {
      const id = Number(req.params["id"]);
      const findId = await Menu.findByPk(id);
      if (findId) {
        await Menu.destroy({ where: { id } });
        res.status(200).json({
          message: `Menu dengan id ${id} berhasil dihapus`,
        });
      } else {
        throw new Error(`Tidak ada Menu dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
