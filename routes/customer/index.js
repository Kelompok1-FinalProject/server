const customerController = require("../../controllers/customerController");
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");
const isKaryawan = require("../../middlewares/isKaryawan");
const routes = require("express").Router();

routes.post("", customerController.addCustomer);
routes.get("", authentication, isKaryawan, customerController.getCustomer);
routes.get(
  "/:id",
  authentication,
  authorization,
  customerController.getCustomerId
);
routes.patch(
  "/:id",
  authentication,
  isKaryawan,
  customerController.updateStatusBayar
);
routes.put(
  "/:id",
  authentication,
  isKaryawan,
  customerController.updateStatusPesanan
);

module.exports = routes;
