const express = require('express');
const projectDB = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
	projectDB
		.get()
		.then((project) => {
			res.json(project);
		})
		.catch((err) => {
			console.log(err);
		});
});
router.get('/:id', (req, res) => {
	const { id } = req.params;
	projectDB.get(id).then((project) => {
		res.status(200).json(project);
	});
});

router.post('/', (req, res) => {
	const project = req.body;
	projectDB
		.insert(project)
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "You know there ain't no projects"
			});
		});
});
router.put('/', (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			message: 'Missing Manhattan Project'
		});
	}
	projectDB
		.update(req.params.id, req.body)
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "You know there ain't no projects"
			});
		});
});

router.delete('/:projectId', (req, res) => {
	const { projectId } = req.params;

	projectDB
		.remove(projectId)
		.then((project) => {
			if (project > 0) {
				res.status(204).json({
					message: 'The project has been nuked'
				});
			} else {
				res.status(404).json({
					message: 'The project could not be found'
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'Error removing the project'
			});
		});
});

router.get('/:id/actionsId', (req, res) => {
	projectDB
		.getProjectActions(req.params.id, req.params.actionsId)
		.then((actions) => {
			if (actions) {
				res.json(actions);
			} else {
				res.status(404).json({
					message: 'Action not found'
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: 'Could not find project'
			});
		});
});

module.exports = router;
