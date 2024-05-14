'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rates', {
      date: {
        type: Sequelize.DATEONLY,
        primaryKey: true,
        allowNull: false, // Date shouldn't be null
      },
      sign: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false, // Sign shouldn't be null
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false, // Value shouldn't be null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rates');
  },
};
