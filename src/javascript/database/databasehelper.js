const mysql = require("mysql2");
const util = require("util");

console.log("Database Heplper Started");

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'cl_LU2014!',
    database        : 'ddcharacters'
  });
  const promisePool = pool.promise();


async function getResult(query) {
    const[result] = await promisePool.query(query);
    return result;
}

module.exports = {promisePool, getResult};