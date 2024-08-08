const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;