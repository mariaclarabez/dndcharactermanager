// talk to mysql database

const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
    console.log(sql);
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);
  return results;
}

module.exports = {
  query
}