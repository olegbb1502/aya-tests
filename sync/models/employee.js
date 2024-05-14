// employee.js
'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'departments',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // or 'CASCADE' or 'SET NULL' depending on your requirement
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
},
{
    indexes: [
        {
        unique: true,
        fields: ['id'],
        },
    ]
});

module.exports = Employee;
