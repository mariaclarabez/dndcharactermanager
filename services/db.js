// talk to mysql database

const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
    console.log(sql);
  const connection = await mysql.createConnection(process.env.JAWSDB_URL);
  const [results, ] = await connection.execute(sql, params);
  connection.end();
  return results;
}

module.exports = {
  query
}