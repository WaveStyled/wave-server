/**
 * Describes all Database connections that the Node uses on runtime
 * 
 */

const Sequelize = require('sequelize');

const user = 'postgres'
const host = 'localhost'
const database = 'wavestyled'
const password = 'cse115'
const port = '5432'

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false
})

module.exports = sequelize;