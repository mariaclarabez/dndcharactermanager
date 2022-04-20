5
const db = require('../database/databasehelper')
const _ = require('lodash');

//Returns a list of all Users in the DB
async function getAllUsers() {
    const QUERY = "SELECT * FROM USER"
    return db.getResult(QUERY);
}

async function getById(id) {
    const QUERY = "SELECT * FROM USER WHERE id = " + id; // there's probably a bettter way to build queries
    const results = await db.getResult(QUERY);
    console.log("results", results);
    const resultsSize = _.size(results);
    if(resultsSize > 1) {
        throw new Error("Bad request, result size = " + _.size(results));
    } if(resultsSize === 0) {
        return null;
    }
    return results[0];

}

module.exports = {getAllUsers, getById}