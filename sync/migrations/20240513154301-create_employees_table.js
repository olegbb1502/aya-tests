'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employees', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      surname: {
        type: Sequelize.STRING,
      },
      department_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'departments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // or 'CASCADE' or 'SET NULL' depending on your requirement
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
    await queryInterface.dropTable('employees');
  },
};
