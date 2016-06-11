/**
 * ProjectController
 *
 * @description :: Server-side logic for managing Projects
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
			if(user.type !== 'PM') {
				ResponseService.responseForError(req, res, 'You don\'t have permission to create project');
				return;
			}
			Project.create({
				name: req.param('name'),
				date: req.param('date'),
				user: user
			}).exec((err, project) => {
				if(err) {
					ResponseService.responseForError(req, res, err);
					return;
				}

				res.send({
					status: 'success',
					project
				});
				return;
			});
		});
	},

	remove(req, res) {
		Project.destroy({
			id: req.param('id'),
			user: req.param('user')
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
	},

	update(req, res) {
		Project.update({
			id: req.param('id'),
			user: req.param('user')
		},{
			name: req.param('name'),
			date: req.param('date')
		}).exec((err, project) => {
			if(err) {
				ResponseService.responseForError(req, res, err);
				return;
			}

			res.send({
				status: 'success',
				project
			});
			return;
		});
	},

	getOne(req, res) {
		Project.findOne({
			id: req.param('id')
		}).populate('user')
		.exec((err, project) => {
			if(err) {
				ResponseService.responseForError(req, res, err);
				return;
			}
			if(!project) {
				ResponseService.responseForEmpty(req, res, 'Project');
				return;
			}

			res.send({
				status: 'success',
				project
			});
			return;
		});
	},

	getAll(req, res) {
		Project.find().populate('user')
		.exec((err, projects) => {
			if(err) {
				ResponseService.responseForError(req, res, err);
				return;
			}

			res.send({
				status: 'success',
				projects
			});
			return;
		});
	}
};
