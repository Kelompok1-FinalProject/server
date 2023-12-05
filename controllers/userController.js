const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const secret = "cafe-serumpunrasa";

class Controller {
  static async registerUser(req, res, next) {
    const body = req.body;
    const { nama, role, email, password } = body;

    try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email tidak valid' });
    }

    if (!validator.isLength(password, { min: 8, max: 20 })) {
      return res.status(400).json({ error: 'Panjang password min 8 karakter dan max 20 karakter' });
    }

    const newUser = await User.create({
      nama,
      role,
      email,
      password,
    });
    res.status(201).json({ message: "Akun berhasil dibuat, silahkan login.", newUser});
    } catch(error) {
    return res.status(500).json(error);
      }
  };

  static async loginUser(req, res, next) {
    const body = req.body;
    const { email, password } = req.body;

    try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email tidak valid' });
    } 

    const loginUser = await User.findOne({ where: { email } });
      if (loginUser) {
        const hash = loginUser.password;
        const isValid = bcrypt.compareSync(password, hash);

        if (isValid) {
          const token = jwt.sign(
            {
              id: loginUser.id,
              email: loginUser.email,
            },
            secret
          );
          res.status(200).json(token);
        } else {
          next(new Error("Email atau Password Salah"));
        }
      } else {
        next(new Error("Email atau Password Salah"));
      }
    } catch (error) {
      next(error);
    }
 }
}

module.exports = Controller;