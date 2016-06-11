// ResponseService.js
module.exports = {

  responseForError(req, res, data) {
    res.send({
      status: 'error',
      error: data
    });
  },

  responseForEmpty(req, res, data) {
    res.send({
      status: 'error',
      error: data + ' not found'
    });
  },

};
