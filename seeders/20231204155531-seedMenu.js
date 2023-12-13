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
            "Nikmati kesegaran Es Teh untuk melepas dahaga dan memberikan kesegaran saat meminumnya.",
          gambar:
            "https://drive.google.com/file/d/1tWUH0eFgWbyS5ZRxQZDRMJWPSNikezhE/view?usp=sharing",
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
          gambar:
            "https://drive.google.com/file/d/1gQSTS5NLh4OIJ5DcbPWGCn1OFk1uLH2k/view?usp=sharing",
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
          gambar:
            "https://drive.google.com/file/d/1uEaoNaqrH_AW18GnzxSZJwuaG76358Do/view?usp=sharing",
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
          gambar:
            "https://drive.google.com/file/d/1M6894epFfn7b8l3hM8AYpCwZm_a4qxXz/view?usp=sharing",
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
          gambar:
            "https://drive.google.com/file/d/1SeY-2VR6G5zVEoh4RIxw_9zyoanvWPNG/view?usp=sharing",
          harga: 10000,
          kategori: "minuman",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nugget",
          description: "Crunchy chicken nuggets.",
          gambar:
            "https://drive.google.com/file/d/1gMwOJnRDtpBWX5yriChRyrsrlKsHg7NQ/view?usp=sharing",
          harga: 8000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Burger",
          description: "Tasty burger with various toppings.",
          gambar:
            "https://drive.google.com/file/d/1U5hg3-cZlhDmVbKmMyYEIbAK_WifsxX3/view?usp=sharing",
          harga: 12000,
          kategori: "makanan",
          status: "public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lemon Tea",
          description: "Cold lemon-flavored tea.",
          gambar:
            "https://drive.google.com/file/d/1iMfAVfCcnxqUnVGsBdzLCuihmXKHG2h_/view?usp=sharing",
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
