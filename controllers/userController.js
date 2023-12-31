const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const secret = "cafe-serumpunrasa";

class Controller {
  static async registerUser(req, res, next) {
    const body = req.body;
    const { name, role, email, password } = body;

    try {
      if (!validator.isEmail(email)) {
        throw new Error("Email tidak valid");
      }

      if (!validator.isLength(password, { min: 8, max: 20 })) {
        throw new Error("Panjang password min 8 karakter dan max 20 karakter");
      }

      const newUser = await User.create({
        name,
        role,
        email,
        password,
      });
      res.status(201).json({
        message: "Akun berhasil dibuat, silahkan login.",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    const body = req.body;
    const { email, password } = body;

    try {
      if (!validator.isEmail(email)) {
        throw new Error("Email tidak valid");
      }

      const loginUser = await User.findOne({ where: { email } });
      if (loginUser) {
        const hash = loginUser.password;
        const isValid = bcrypt.compareSync(password, hash);

        if (isValid) {
          const token = jwt.sign(
            {
              id: loginUser.id,
              role: loginUser.role,
              email: loginUser.email,
            },
            secret
          );
          res.status(200).json({
            message: "Anda Berhasil Login.",
            data: token,
          });
        } else {
          throw new Error("Email atau Password Salah");
        }
      } else {
        throw new Error("Email atau Password Salah");
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
