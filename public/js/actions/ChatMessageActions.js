'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var socket = io.connect();

socket.on('new message', function(data) {
  AppDispatcher.dispatch({
    actionType: AppConstants.CREATE_MESSAGE,
    data: data
  });
})

var MessageActions = {

  createMessage: function(text){
    var name = window.localStorage.getItem('flashbackChat');
    var newMessage = {
      createdAt: Date.now(),
      authorName: name,
      text: text
    };

    socket.emit('send message', newMessage);
    
  }, 

  getMessages: function() {
    $.ajax({
      url: '/api/messages/',
      dataType: 'json',
      type: 'GET',
      success: function(data){
        AppDispatcher.dispatch({
          actionType: AppConstants.RECEIVE_MESSAGES,
          data: data
        });
      }
    })
  }
}; 

module.exports = MessageActions;