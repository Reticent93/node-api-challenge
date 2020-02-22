const express = require('express');
const actionsDB = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
	actionsDB
		.get()
		.then((action) => {
			res.json(action);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	actionsDB.get(id).then((action) => {
		res.status(200).json(action);
	});
});

router.post('/', (req, res) => {
	const action = req.body;
	actionsDB
		.insert(action)
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "You know there ain't no actions"
			});
		});
});
router.put('/', (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			message: 'Missing Action Jackson'
		});
	}
	actionsDB
		.update(req.params.id, req.body)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "You know there ain't no actions"
			});
		});
});

router.delete('/:actionId', (req, res) => {
	const { actionId } = req.params;

	actionsDB
		.remove(actionId)
		.then((action) => {
			if (action > 0) {
				res.status(204).json({
					message: 'The action has been nuked'
				});
			} else {
				res.status(404).json({
					message: 'The action could not be found'
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'Error removing the action'
			});
		});
});
module.exports = router;
