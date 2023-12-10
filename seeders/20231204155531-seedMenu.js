"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Menus",
      [
        {
          name: "Iced Tea",
          description:
            " Nikmati kesegaran Es Teh untuk melepas dahaga dan memberikan kesegaran saat meminumnya.",
          gambar: "link",
          harga: 5000,
          kategori: "minuman",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "French Fries",
          description:
            "Kentang potong tipis yang digoreng dengan sempurna hingga keemasan, disajikan dengan sentuhan garam yang pas.",
          gambar: "link",
          harga: 10000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pempek Palembang",
          description:
            "Pempek tradisional Palembang yang diolah dengan rasa modern. Digoreng hingga renyah, dan disajikan dengan saus cuko khas.",
          gambar: "link",
          harga: 15000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nasi Goreng Spesial",
          description:
            "Paduan sempurna antara nasi yang gurih, potongan daging ayam lembut, telur mata sapi, dan sayuran segar yang digoreng dengan bumbu spesial.",
          gambar: "link",
          harga: 20000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Coffe Milk",
          description:
            "Kopi berkualitas tinggi yang dipadukan dengan susu lembut, menciptakan harmoni cita rasa yang luar biasa.",
          gambar: "link",
          harga: 10000,
          kategori: "minuman",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nugget",
          description: "Crunchy chicken nuggets.",
          gambar: "link",
          harga: 8000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Burger",
          description: "Tasty burger with various toppings.",
          gambar: "link",
          harga: 12000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lemon Tea",
          description: "Cold lemon-flavored tea.",
          gambar: "link",
          harga: 8000,
          kategori: "minuman",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
