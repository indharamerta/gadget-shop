'use strict';
const data = [
  {
    name: "Galaxy S21 Ultra 5G 256GB",
    price: 18000000,
    image: "/image/SamsungS21.png",
    description: "Galaxy S21 Ultra 5G made for the epic in everyday",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Lenovo Legion Pro Duel 256GB",
    price: 15000000,
    image: "/image/LenovoLegion.png",
    description: "Find exolution on every level in the Lenovo Legion Phone Duel",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Xiaomi Mi 11 256GB",
    price: 12000000,
    image: "/image/Xiaomi11.png",
    description: "Film like a director. Mi 11 is made for movie lovers",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Iphone 12 Pro Max 256GB",
    price: 20000000,
    image: "/image/Iphone12.png",
    description: "12 Pro Max. Camerus maximus.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Items", data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Items", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};



