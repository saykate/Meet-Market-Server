const express = require('express');
const router = express.Router();
const lists = require('../controllers/list.controller')

router.put('/:_id', lists.updateList);

module.exports = router;