'use strict';

var messageController = require('../controllers/messageController');

module.exports = function(app) {
  app.get('/tags', messageController.getTags);
  // app.post('/create', messageController.createMessage);
}
