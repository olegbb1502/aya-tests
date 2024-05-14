// rate.js
'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Rate = sequelize.define('Rate', {
    date: {
      type: DataTypes.DATEONLY, // DATE type without time
      primaryKey: true,
    },
    sign: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
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

module.exports = Rate;
