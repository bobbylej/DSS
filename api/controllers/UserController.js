/**
 * UserController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  getOne(req, res) {
    User.findOne({
      id: req.param('id')
    })
    .exec((err, user) => {
      if(err) {
        ResponseService.responseForError(req, res, err);
        return;
      }
      if(!user) {
        ResponseService.responseForEmpty(req, res, 'User');
        return;
      }

      res.send({
        status: 'success',
        user
      });
      return;
    });
  },

  getAll(req, res) {
    User.find()
    .exec((err, users) => {
      if(err) {
        ResponseService.responseForError(req, res, err);
        return;
      }

      res.send({
        status: 'success',
        users
      });
      return;
    });
  },

  registerLocal(req, res) {
    var provider = req.param('provider') ? req.param('provider') : 'local';
    var type = req.param('type') ? req.param('type') : 'Employee';

    var dataUser = {
      name: req.param('name'),
      password: req.param('password'),
      firstname: req.param('firstname'),
      lastname: req.param('lastname'),
      email: req.param('email'),
      provider: provider,
      type: type
    };

    User.findOne({
      name: dataUser.name
    }).exec((err, user) => {
      if(err) {
        ResponseService.responseForError(req, res, err);
        return;
      }
      if(user) {
        ResponseService.responseForError(req, res, 'User with name "'+dataUser.name+'" is already created');
        return;
      }

      module.exports.register(dataUser, (err, user) => {
        if(err) {
          ResponseService.responseForError(req, res, err);
          return;
        }

        res.send({
          status: 'success',
          user
        });
        return;
      });

    });
  },

  loginLocal(req, res) {
    User.findOne({
      name: req.param('name'),
      password: req.param('password'),
    }).exec((err, user) => {
      if(err) {
        ResponseService.responseForError(req, res, err);
        return;
      }
      if(!user) {
        ResponseService.responseForEmpty(req, res, 'User');
        return;
      }

      res.send({
        status: 'success',
        user
      });
      return;
    });
  },

  loginFacebook(req, res) {
    User.findOne({
      provider: 'facebook',
      uid: req.param('uid'),
    }).exec((err, user) => {
      if(err) {
        ResponseService.responseForError(req, res, err);
        return;
      }
      if(!user) {
        var dataUser = {
          uid: req.param('uid'),
          name: req.param('name'),
          firstname: req.param('firstname'),
          lastname: req.param('lastname'),
          email: req.param('email'),
          provider: 'facebook',
          type: 'Employee'
        };
        return module.exports.register(dataUser, (err, user) => {
          if(err) {
  					ResponseService.responseForError(req, res, err);
            return;
          }

          res.send({
            status: 'success',
            user
          });
          return;
        });
      }

      res.send({
        status: 'success',
        user
      });
      return;
    });
  },

  register(dataUser, callback) {
    User.create(dataUser).exec((err, user) => {
      if(err) {
        return callback(err, undefined);
      }
      if(!user.uid) {
        user.uid = user.id;
        user.save((err, s) => {
          if(err) {
            return callback(err, undefined);
          }

          return callback(undefined, user);
        });
      }
      else {
        return callback(undefined, user);
      }
    });
  },

};
