'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const getPastDate = (numOfMonths, date = new Date()) => {
      const transformedDate = date.setMonth(date.getMonth() - numOfMonths);
      return new Date(transformedDate);
    };

    return queryInterface.bulkInsert('Products', [
      {
        name: 'product',
        price: 100,
        discount: 0,
        createdAt: getPastDate(2),
      },
      {
        name: 'product1',
        price: 100,
        discount: 0,
        createdAt: getPastDate(1),
      },
      {
        name: 'product2',
        price: 200,
        discount: 0,
        createdAt: new Date(),
      },
      {
        name: 'product3',
        price: 300,
        discount: 0,
        createdAt: new Date(),
      },
      {
        name: 'product4',
        price: 100,
        discount: 0,
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
