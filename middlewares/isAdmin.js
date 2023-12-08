const { User } = require("../models");

async function isAdmin(req, res, next) {
  const userId = req.id;

  const admin = await User.findOne({ where: { id: userId } });
  if (admin && admin.isAdmin === true) {
    next();
  } else {
    next(new Error("Anda bukan owner!!"));
  }
}

module.exports = isAdmin;