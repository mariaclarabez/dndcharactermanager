// get and create the programming language resource

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM DDCHARACTER LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getAllClasses() {
    const rows = await db.query(
      `SELECT * FROM CLASS`
    );
    const data = helper.emptyOrRows(rows);  

    return data
}

async function getAllRaces() {
    const rows = await db.query(
      `SELECT * FROM RACE`
    );
    const data = helper.emptyOrRows(rows);  

    return data
}
/* call stored procedure create character */
async function createCharacter(character){
    let query = `CALL create_character("${character.char_name}",${character.race_id},${character.class_id})`;
    const result = await db.query(query);
  
    let message = 'Error in creating character';
  
    if (result.affectedRows) {
      message = 'Character created successfully';
    }
  
    return {message};
  }

  async function update(id, character){
    const result = await db.query(
      `UPDATE DDCHARACTER 
      SET char_name="${character.char_name}", 
      class_id = ${character.class_id},
      race_id = ${character.race_id},
      wisdom = ${character.wisdom},
      charisma = ${character.charisma},
      strength = ${character.strength},
      dexterity = ${character.dexterity},
      intelligence = ${character.intelligence},
      constitution = ${character.constitution}
      WHERE id=${id}` 
    );
  
    let message = 'Error in updating character';
  
    if (result.affectedRows) {
      message = 'Character updated successfully';
    }
  
    return {message};
  }

  async function remove(id){
    const result = await db.query(
      `DELETE FROM DDCHARACTER WHERE id=${id}`
    );
  
    let message = 'Error in deleting programming language';
  
    if (result.affectedRows) {
      message = 'Character deleted successfully';
    }
  
    return {message};

}

module.exports = {
  getAll,
  createCharacter,
  update,
  remove,
  getAllClasses,
  getAllRaces
}