const routes = require("express").Router();
const userRoutes = require("./user/index");
const customerRoutes = require("./customer/index");
const menuRoutes = require("./menu/index");
const transaksiRoutes = require("./transaksi/index");
const laporanRoutes = require("./laporan/index");

routes.use("", userRoutes);
routes.use("/menu", menuRoutes);
routes.use("/customer", customerRoutes);
routes.use("/transaksi", transaksiRoutes);
routes.use("/laporan", laporanRoutes);

module.exports = routes;
