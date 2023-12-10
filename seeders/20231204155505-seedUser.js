"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashpass = await bcrypt.hash("serumpunrasa", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "F2DRW",
          email: "serumpunrasa6483@gmail.com",
          password: hashpass,
          role: "Owner",
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
