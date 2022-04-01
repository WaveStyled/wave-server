const post = require("pg").Pool;

const pool = new Pool ({
  user: "postgres",
  password: "cse115",
  host: "localhost",
  port: 5432,
  database: "WaveStyled"
});

module.exports = pool;
