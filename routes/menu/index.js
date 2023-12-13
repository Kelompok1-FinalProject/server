const menuController = require("../../controllers/menuController");
const authentication = require("../../middlewares/authentication");
const isAdmin = require("../../middlewares/isAdmin");
const isKaryawan = require("../../middlewares/isKaryawan");
const routes = require("express").Router();

routes.post("", authentication, isAdmin, menuController.addMenu);
routes.get("", menuController.getMenu);
routes.get("/:id", menuController.getMenuId);
routes.get("/:kategori/menu", menuController.getMenuKategori);
routes.put("/:id", authentication, isAdmin, menuController.updateMenu);
routes.patch(
  "/:id",
  authentication,
  isKaryawan,
  menuController.updateStatusMenu
);
routes.delete("/:id", authentication, isAdmin, menuController.deleteMenu);

module.exports = routes;
