const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const User = require('./user')(sequelize, DataTypes);

const db = {
  User,
  sequelize,
  Sequelize,
};

module.exports = db;
