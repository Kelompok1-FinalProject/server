const { Customer } = require("../models");

async function isCustomer(req, res, next) {
  try {
    const id = req.id;
    const param = req.params;
    const customerId = param.id;

    const customer = await Customer.findByPk(customerId);
    if (customer) {
      if (customer && customer.id === id) {
        next();
      } else {
        throw new Error("DATA CUSTOMER INI BUKAN MILIK ANDA");
      }
    } else {
      throw new Error(`Tidak ada Data Customer dengan id ${customerId}`);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = isCustomer;
