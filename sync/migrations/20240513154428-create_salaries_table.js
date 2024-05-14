'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salaries', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'employees',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // or 'SET NULL' or 'CASCADE' depending on your requirement
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      date: {
        type: Sequelize.DATEONLY, // DATE type without time
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
    await queryInterface.dropTable('salaries');
  },
};
