const { Customer } = require("../models");

async function isCustomer(req, res, next) {
  try {
    const id = req.id;
    const name = req.name;
    const noMeja = req.noMeja;
    // const param = req.params;
    // const customerId = param.id;

    const customer = await Customer.findByPk(id);
    if (
      customer.id === id &&
      customer.name === name &&
      customer.noMeja === noMeja
    ) {
      // if (customer && customer.id === id) {
      next();
      // } else {
      //   throw new Error("DATA CUSTOMER INI BUKAN MILIK ANDA");
      // }
    } else {
      throw new Error(`Tidak ada Data Customer dengan id ${id}`);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = isCustomer;
