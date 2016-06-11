/**
 * ProjectEmployeeController
 *
 * @description :: Server-side logic for managing Projectemployees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create(req, res) {
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

				ProjectEmployee.findOne({
					user: user.id,
					project: project.id
				}).exec((err, employee) => {
					if(err) {
						ResponseService.responseForError(req, res, err);
						return;
					}
					if(employee) {
						ResponseService.responseForError(req, res, 'Employee already added');
						return;
					}

					ProjectEmployee.create({
						user,
						project
					}).exec((err, employee) => {
						if(err) {
							ResponseService.responseForError(req, res, err);
							return;
						}

						res.send({
							status: 'success',
							user,
							project,
						});
						return;
					});
				});
			});
		});
	},

	remove(req, res) {
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

			ProjectEmployee.destroy({
				user: req.param('user'),
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

			ProjectEmployee.find({
				project: project.id
			}).populate('user')
			.exec((err, employees) => {
				if(err) {
					ResponseService.responseForError(req, res, err);
					return;
				}

				res.send({
					status: 'success',
					employees
				});
				return;
			});
		});
	}
};
