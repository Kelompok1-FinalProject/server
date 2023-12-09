const { Menu } = require("../models");

class Controller {
  static async addMenu(req, res, next) {
    try {
      const { name, description, gambar, harga, kategori } = req.body;
      const menu = await Menu.create({
        name,
        description,
        gambar,
        harga,
        kategori
      });
      res.status(201).json(menu);
    } catch (error) {
      next(error);
    }
  }
  static async getMenu(req, res, next) {
    try {
      const menu = await Menu.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(menu);
    } catch (error) {
      next(error);
    }
  }
  static async getMenuKategori(req, res, next) {
    try {
      let kategori = req.params["kategori"];
      if (kategori == "makanan" || kategori == "minuman") {
        try {
          const menu = await Menu.findAll({
            where: {
              kategori,
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
          });
          res.status(200).json(menu);
        } catch (error) {
          next(error);
        }
      } else {
        throw new Error(`Tidak ada Menu dengan kategori ${kategori}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateMenu(req, res, next) {
    try {
      const { name, description, harga } = req.body;
      let id = Number(req.params["id"]);
      const findId = await Menu.findByPk(id);
      if (findId) {
        await Menu.update(
          {
            name,
            description,
            harga,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json(`Menu dengan id ${id} berhasil diupdate`);
      } else {
        throw new Error(`Tidak ada Menu dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateStatusMenu (req, res, next) {
    try {
        const { status } = req.body;
        let id = Number(req.params["id"]);
        const findId = await Menu.findByPk(id);
        console.log(findId);
        if (findId) {
          await Menu.update(
            {
              status,
            },
            {
              where: {
                id: id,
              },
            }
          );
          res.status(200).json(`Menu dengan id ${id} berhasil diupdate`);
        } else {
          throw new Error(`Tidak ada Menu dengan id ${id}`);
        }
      } catch (error) {
        next(error);
      }
  }
  static async deleteMenu(req, res, next) {
    try {
      let id = Number(req.params["id"]);
      const findId = await Menu.findByPk(id);
      if (findId) {
        await Menu.destroy({
          where: {
            id: id,
          },
        });
        res.status(200).json(`Menu dengan id ${id} berhasil dihapus`);
      } else {
        throw new Error(`Tidak ada Menu dengan id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;