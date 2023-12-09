const { User } = require("../models");

async function isKaryawan(req, res, next) {
  try {
    const adminId = req.id;
    const role = req.role;

    const admin = await User.findOne({ where: { id: adminId } });
    console.log(role);
    if (
      admin.role === role &&
      (role === "Owner" || role === "Kasir" || role === "Pelayan")
    ) {
      next();
    } else {
      throw new Error("KAMU BUKAN KARYAWAN SERUMPUN RASA");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = isKaryawan;