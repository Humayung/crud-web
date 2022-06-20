const { DataTypes } = require('sequelize');
const db = require('../database');

const Author = db.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING(80),
  password: {
    type: DataTypes.STRING(255),
  },
});

module.exports = Author;
