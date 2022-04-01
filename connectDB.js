const conn = require("pg").Pool;

const Conn = new conn({
  user: "postgres",
  password: "cse115",
  host: "localhost",
  port: 5432,
  database: "WaveStyled"
});

module.exports = Conn;
