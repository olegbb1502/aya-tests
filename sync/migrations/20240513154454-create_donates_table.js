'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('donates', {
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
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('donates');
  },
};
