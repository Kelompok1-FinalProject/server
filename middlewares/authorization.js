const { Customer } = require("../models");

async function authorization(req, res, next) {
  try {
    const id = req.id;
    const param = req.params;
    const customerId = param.id;

    const customer = await Customer.findByPk(customerId);
    if (customer) {
      if (customer && customer.id === id) {
        next();
      } else {
        throw new Error("Transaski ini bukan milik anda!!!!");
      }
    } else {
      throw new Error(`Tidak ada Transaksi dengan id ${customerId}`);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;