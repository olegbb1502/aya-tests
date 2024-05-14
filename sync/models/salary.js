// salary.js
'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Employee = require('./employee');

const Salary = sequelize.define('Salary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // or 'SET NULL' or 'CASCADE' depending on your requirement
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  date: {
    type: DataTypes.DATEONLY, // DATE type without time
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

module.exports = Salary;
