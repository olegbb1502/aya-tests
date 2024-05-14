const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite dialect
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../dev.database.sqlite', // Path to your SQLite file
  logging: false, // Disable logging (optional)
});

module.exports = sequelize;
