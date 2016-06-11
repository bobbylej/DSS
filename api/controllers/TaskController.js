/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		create(req, res) {
			User.findOne({
				id: req.param('creator')
			}).exec((err, user) => {
				if(err) {
					ResponseService.responseForError(req, res, err);
					return;
				}
				if(!user) {
					ResponseService.responseForEmpty(req, res, 'User');
					return;
				}

				Project.findOne({
					id: req.param('project'),
					user: user.id
				}).exec((err, project) => {
					if(err) {
						ResponseService.responseForError(req, res, err);
						return;
					}
					if(!project) {
						ResponseService.responseForEmpty(req, res, 'Project');
						return;
					}

					Task.create({
						name: req.param('name'),
						project
					}).exec((err, task) => {
						if(err) {
							ResponseService.responseForError(req, res, err);
							return;
						}

						res.send({
							status: 'success',
							task
						});
						return;
					});
				});
			});
		},

		remove(req, res) {
			User.findOne({
				id: req.param('creator')
			}).exec((err, user) => {
				if(err) {
					ResponseService.responseForError(req, res, err);
					return;
				}
				if(!user) {
					ResponseService.responseForEmpty(req, res, 'User');
					return;
				}

				Project.findOne({
					id: req.param('project'),
					user: user.id
				}).exec((err, project) => {
					if(err) {
						ResponseService.responseForError(req, res, err);
						return;
					}
					if(!project) {
						ResponseService.responseForEmpty(req, res, 'Project');
						return;
					}

					Task.destroy({
						id: req.param('id'),
						project: project.id
					}).exec((err) => {
						if(err) {
							ResponseService.responseForError(req, res, err);
							return;
						}

						res.send({
							status: 'success'
						});
						return;
					});
				});
			});
		},

		update(req, res) {
			User.findOne({
				id: req.param('user')
			}).exec((err, user) => {
				if(err) {
					ResponseService.responseForError(req, res, err);
					return;
				}
				if(!user) {
					ResponseService.responseForEmpty(req, res, 'User');
					return;
				}

				Project.findOne({
					id: req.param('project'),
					user: req.param('creator')
				}).exec((err, project) => {
					if(err) {
						ResponseService.responseForError(req, res, err);
						return;
					}
					if(!project) {
						ResponseService.responseForEmpty(req, res, 'Project');
						return;
					}

					Task.update({
						id: req.param('id'),
						project: project.id
					},{
						user: user
					}).exec((err, task) => {
						if(err) {
							ResponseService.responseForError(req, res, err);
							return;
						}
						if(!task) {
							ResponseService.responseForEmpty(req, res, 'Task');
							return;
						}

						res.send({
							status: 'success',
							task
						});
						return;
					});
				});
			});
		},

		getOne(req, res) {
			Task.findOne({
				id: req.param('id')
			}).populate('user').populate('project')
			.exec((err, task) => {
				if(err) {
					ResponseService.responseForError(req, res, err);
					return;
				}
				if(!task) {
					ResponseService.responseForEmpty(req, res, 'Task');
					return;
				}

				res.send({
					status: 'success',
					task
				});
				return;
			});
		},

		getAll(req, res) {
			Task.find().populate('user')
			.exec((err, tasks) => {
				if(err) {
					ResponseService.responseForError(req, res, err);
					return;
				}

				res.send({
					status: 'success',
					tasks
				});
				return;
			});
		},

		getAllForProject(req, res) {
			Project.findOne({
				id: req.param('project')
			}).exec((err, project) => {
				if(err) {
					ResponseService.responseForError(req, res, err);
					return;
				}
				if(!project) {
					ResponseService.responseForEmpty(req, res, 'Project');
					return;
				}

				Task.find({
					project: project.id
				}).populate('user')
				.exec((err, tasks) => {
					if(err) {
						ResponseService.responseForError(req, res, err);
						return;
					}

					res.send({
						status: 'success',
						tasks
					});
					return;
				});
			});
		}
};
