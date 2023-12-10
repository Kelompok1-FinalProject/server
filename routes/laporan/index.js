const laporanController = require("../../controllers/laporanController");
const authentication = require("../../middlewares/authentication");
const isAdmin = require("../../middlewares/isAdmin");
const routes = require("express").Router();

routes.get("", authentication, isAdmin, laporanController.getLaporan);
routes.get("/:id", authentication, isAdmin, laporanController.getLaporanId);

module.exports = routes;
