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
          description: "Nikmati kesegaran Es Teh untuk melepas dahaga dan memberikan kesegaran saat meminumnya.",
          gambar: "https://i.imgur.com/ZUHAHy2.jpg",
          harga: 5000,
          kategori: "minuman",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "French Fries",
          description: "Kentang potong tipis yang digoreng dengan sempurna hingga keemasan, disajikan dengan sentuhan garam yang pas.",
          gambar: "https://i.imgur.com/0k34B7P.jpg",
          harga: 10000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pempek Palembang",
          description: "Pempek tradisional Palembang yang diolah dengan rasa modern. Digoreng hingga renyah, dan disajikan dengan saus cuko khas.",
          gambar: "https://i.imgur.com/bDcE0TV.jpg",
          harga: 15000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nasi Goreng Spesial",
          description: "Paduan sempurna antara nasi yang gurih, potongan daging ayam lembut, telur mata sapi, dan sayuran segar yang digoreng dengan bumbu spesial.",
          gambar: "https://i.imgur.com/wBFM8Aa.jpg",
          harga: 20000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Coffe Milk",
          description: "Kopi berkualitas tinggi yang dipadukan dengan susu lembut, menciptakan harmoni cita rasa yang luar biasa.",
          gambar: "https://i.imgur.com/Z3zJO7q.jpg",
          harga: 10000,
          kategori: "minuman",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nugget",
          description: "Crunchy chicken nuggets.",
          gambar: "https://i.imgur.com/c4FYfTm.jpg",
          harga: 8000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Burger",
          description: "Tasty burger with various toppings.",
          gambar: "https://i.imgur.com/bcFrk02.jpg",
          harga: 12000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lemon Tea",
          description: "Cold lemon-flavored tea.",
          gambar: "https://i.imgur.com/AEFYTEj.jpg",
          harga: 8000,
          kategori: "minuman",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Es Cendol",
          description: "Traditional Indonesian iced dessert with pandan rice flour jelly, coconut milk, and palm sugar.",
          gambar: "https://i.imgur.com/vdB8aEV.png",
          harga: 10000,
          kategori: "minuman",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ramen",
          description: "Authentic Japanese ramen with rich broth, tender noodles, and a variety of toppings.",
          gambar: "https://i.imgur.com/0q2qWcJ.jpg",
          harga: 15000,
          kategori: "makanan",
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
