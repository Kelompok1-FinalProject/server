const customerController = require("../../controllers/customerController");
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");
const isAdmin = require("../../middlewares/isAdmin");
const isKaryawan = require("../../middlewares/isKaryawan");
const routes = require("express").Router();

routes.post("", customerController.postCustomer);
routes.get("", authentication, isAdmin, customerController.getCustomer);
routes.get(
  "/:id",
  authentication,
  authorization,
  customerController.getCustomerId
);
routes.patch("/:id", authentication, isKaryawan, customerController.updateStatusBayar);
routes.patch("/:id", authentication, isKaryawan, customerController.updateStatusPesan);

module.exports = routes;