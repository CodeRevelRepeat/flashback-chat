'use strict';

var messageController = require('../controllers/messageController');

module.exports = function(app) {
  app.get('/', messageController.getMessages);
  app.post('/create', messageController.createMessage);
}
