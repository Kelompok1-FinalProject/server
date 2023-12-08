const jwt = require("jsonwebtoken");
const secret = "cafe-serumpunrasa";

async function authentication(req, res, next) {
  try {
    const header = req.headers;
    const bearer = header.authorization;
    const token = bearer.slice(7);
    const decoded = jwt.verify(token, secret);

    // ID
    req.id = decoded.id;

    // Admin
    req.email = decoded.email;
    req.isAdmin = decoded.isAdmin;
    req.role = decoded.role;

    // Customer
    req.name = decoded.name;
    req.noMeja = decoded.noMeja;
    req.totalPembayaran = decoded.totalPembayaran;
    console.log(decoded);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;