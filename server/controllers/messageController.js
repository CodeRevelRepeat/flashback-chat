'use strict';

var Message = require('../models').Message;


module.exports = {
  createMessage: function(message) {
    var newMessage = {
          text: message.text,
          authorName: message.authorName
        };
    Message.build(newMessage)
      .save()
      .catch(function(err) {
        console.error(err);
      });
  },

  getMessages: function(req, res, next) {
    Message.findAll({
      limit: 50,
      order: '"createdAt" DESC',
    })
      .then(function(messages) {
        res.send(messages.reverse());
      })
      .catch(function(error) {
        res.status(400).send(error);
      });
  }
}