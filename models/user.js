
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../utils/database.js')

const User = sequelize.define('users', {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   name: {
      type: DataTypes.STRING,
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});

module.exports = User;