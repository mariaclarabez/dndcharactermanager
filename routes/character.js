// glue between the URI and the corresponding function in the services/character.js

const express = require('express');
const router = express.Router();
const ddcharacters = require('../services/character');

/* GET all dd characters. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await ddcharacters.getAll(req.query.page));
  } catch (err) {
    console.error(`Error while getting ddcharacters `, err.message);
    next(err);
  }
});

/* POST ddcharacter */
router.post('/', async function(req, res, next) {
  try {
    console.log("hello post");
    res.json(await ddcharacters.createCharacter(req.body));
  } catch (err) {
    console.error(`Error while creating chharacter`, err.message);
    next(err);
  }
});

/* PUT DDCHARACTER */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await ddcharacters.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating character`, err.message);
    next(err);
  }
});
 
/* DELTE DDCHARACTER */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await ddcharacters.remove(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while deleting character`, err.message);
    next(err);
  }
});
 



module.exports = router;