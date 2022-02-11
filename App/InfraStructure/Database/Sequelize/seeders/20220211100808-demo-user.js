'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'Demo User',
      userId: "34417ee8-2237-41cc-888e-670957d81f6c",
      password: "$2b$10$Y9cl8uCDME9qpzqBxw6PouZaFEAFgkTUwn/56cMAr42CLV6MwygkC",
      email: 'demouser@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
