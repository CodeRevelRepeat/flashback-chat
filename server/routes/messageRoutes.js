'use strict';

var messageController = require('../messages/messageController');

module.exports = function(app) {
  app.get('/', messageController.getMessages);
  app.post('/create', messageController.createMessage);
}
