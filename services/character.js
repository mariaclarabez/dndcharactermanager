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

async function createCharacter(character){
    const result = await db.query(
      `INSERT INTO DDCHARACTER
      (char_name, class_id, race_id, wisdom, charisma, strength, dexterity, intelligence, constitution) 
      VALUES 
      ("${character.char_name}", ${character.class_id}, ${character.race_id}, ${character.wisdom}, 
        ${character.charisma}, ${character.strength}, ${character.dexterity}, ${character.intelligence},  
        ${character.constitution})`
    );
  
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
      message = 'Programming language deleted successfully';
    }
  
    return {message};

}

module.exports = {
  getAll,
  createCharacter,
  update,
  remove
}