var express = require('express');
var router = express.Router();
var ctrlSpells = require('../controllers/spells');

// spells
router.get('/spells/list/:spellname', ctrlSpells.spellsListByName);
router.get('/spells/:spellid', ctrlSpells.spellGetOne);

module.exports = router;