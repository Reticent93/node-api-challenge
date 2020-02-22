const express = require('express');
const project = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
	project.find().then((data) => res.status(200).json(data)).catch((err) => console.log(err));
});

module.exports = router;
