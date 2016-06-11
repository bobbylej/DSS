/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    provider: {
      type: 'string',
      enum: ['facebook', 'local'],
      required: true
    },

    uid: 'string',

    name: {
      type: 'string',
      required: true,
      unique: true
    },

    password: 'string',

    email: 'string',

    firstname: 'string',

    lastname: 'string',

    type: {
      type: 'string',
      enum: ['PM', 'Employee'],
      required: true
    },
  },
  beforeCreate: function(obj, next) {
    if(obj.provider == 'local' && !obj.password) {
        next('Password required');
    }
    else {
      next(null);
    }
  },
  toJSON: function() {
    var obj = this.toObject();
    delete obj.password;
    console.log(obj);
    return obj;
  }
};
