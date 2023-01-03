'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'Invoices',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Orders',
            key: 'id',
          },
          onDelete: 'cascade',
        },
        status: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          type: 'TIMESTAMP',
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        updatedAt: {
          type: 'TIMESTAMP',
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          orderId_unique_constraint: {
            fields: ['orderId'],
          },
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Invoices');
  },
};
