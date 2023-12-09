const transaksiController = require("../../controllers/transaksiController");
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");
const isOrder = require("../../middlewares/isOrder");
const routes = require("express").Router();

routes.post(
  "/:id",
  authentication,
  authorization,
  transaksiController.addTransaksi
);
routes.get("",
  transaksiController.getAllTransaksi
);
routes.get(
  "/:id",
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