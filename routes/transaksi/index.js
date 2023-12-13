const transaksiController = require("../../controllers/transaksiController");
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");
const isKaryawan = require("../../middlewares/isKaryawan");
const isOrder = require("../../middlewares/isOrder");
const routes = require("express").Router();

routes.post(
  "",
  authentication,
  authorization,
  transaksiController.addTransaksi
);
routes.get("", authentication, isKaryawan, transaksiController.getTransaksi);
routes.get(
  "/buyer",
  authentication,
  authorization,
  transaksiController.getTransaksiId
);
routes.put(
  "/:id",
  authentication,
  isOrder,
  transaksiController.updateTransaksi
);
routes.delete(
  "/:id",
  authentication,
  isOrder,
  transaksiController.deleteTransaksi
);

module.exports = routes;
