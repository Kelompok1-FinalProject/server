const { Transaksi } = require("../models");

async function isOrder(req, res, next) {
  try {
    const id = req.id;
    const param = req.params;
    const orderId = param.id;

    const findId = await Transaksi.findOne({ where: { customerId: id } });
    if (findId) {
      const order = await Transaksi.findByPk(orderId);
      console.log(order);
      if (order && order.customerId == id) {
        return next();
      } else {
        throw new Error("Order ini bukan punya anda!!");
      }
    } else {
      throw new Error(`Tidak ada Order dengan CustomerId ${id}`);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = isOrder;