"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRound = 10;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 20],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [8, 20],
        },
      },
      role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Owner", "Kasir", "Pelayan"],
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user, option) {
          user.password = bcrypt.hashSync(user.password, saltRound);
        },
      },
    }
  );
  return User;
};
