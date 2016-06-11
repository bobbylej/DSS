/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  // Auth
  'PUT /api/user/login_local' : {
    controller : 'User',
    action     : 'loginLocal'
  },

  'PUT /api/user/login_fb' : {
    controller : 'User',
    action     : 'loginFacebook'
  },

  'POST /api/user/register' : {
    controller : 'User',
    action     : 'registerLocal'
  },

  //User
  'GET /api/user' : {
    controller : 'User',
    action     : 'getAll'
  },

  'GET /api/user/:id' : {
    controller : 'User',
    action     : 'getOne'
  },

  //Project
  'GET /api/project' : {
    controller : 'Project',
    action     : 'getAll'
  },

  'GET /api/project/:id' : {
    controller : 'Project',
    action     : 'getOne'
  },

  'POST /api/project/create' : {
    controller : 'Project',
    action     : 'create'
  },

  'POST /api/project/:id/remove' : {
    controller : 'Project',
    action     : 'remove'
  },

  'POST /api/project/:id/update' : {
    controller : 'Project',
    action     : 'update'
  },

  //ProjectEmployee
  'GET /api/project/:project/employee' : {
    controller : 'ProjectEmployee',
    action     : 'getAllForProject'
  },

  'POST /api/project/:project/employee/add' : {
    controller : 'ProjectEmployee',
    action     : 'create'
  },

  'POST /api/project/:project/employee/remove' : {
    controller : 'ProjectEmployee',
    action     : 'remove'
  },

  //Task
  'GET /api/task' : {
    controller : 'Task',
    action     : 'getAll'
  },

  'GET /api/project/:project/task' : {
    controller : 'Task',
    action     : 'getAllForProject'
  },

  'GET /api/task/:id' : {
    controller : 'Task',
    action     : 'getOne'
  },

  'POST /api/task/create' : {
    controller : 'Task',
    action     : 'create'
  },

  'POST /api/task/:id/remove' : {
    controller : 'Task',
    action     : 'remove'
  },

  'POST /api/task/:id/update' : {
    controller : 'Task',
    action     : 'update'
  },
};
