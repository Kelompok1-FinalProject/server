const customerController = require("../../controllers/customerController");
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");
const isKaryawan = require("../../middlewares/isKaryawan");
const routes = require("express").Router();

routes.post("", customerController.addCustomer);
routes.get("", authentication, isKaryawan, customerController.getCustomer);
routes.get(
  "/buyer",
  authentication,
  authorization,
  customerController.getCustomerId
);
routes.get("/waitinglist", customerController.getCustomerWaitingList);
routes.patch(
  "/payment",
  authentication,
  authorization,
  customerController.updatePayment
);
routes.patch(
  "/:id/bayar",
  authentication,
  isKaryawan,
  customerController.updateStatusBayar
);
routes.patch(
  "/:id/pesanan",
  authentication,
  isKaryawan,
  customerController.updateStatusPesanan
);

module.exports = routes;
