// donate.js
'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Employee = require('./employee');

const Donate = sequelize.define('Donate', {
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
    type: DataTypes.STRING,
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

module.exports = Donate;
