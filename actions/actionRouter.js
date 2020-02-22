const express = require('express');
const actions = require('./actionModel');

const router = express.Router();

router.get('/', (req, res) => {
	res.json(actions);
});

module.exports = router;
