'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var eventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _messages = {};


var MessageStore = objectAssign({}, eventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getLastAuthor: function() {
    return _lastAuthor;
  },

  getMessages: function() {
    return _messages;
  },

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

});

MessageStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case AppConstants.CREATE_MESSAGE:
      _messages[action.data.createdAt] = action.data;
      MessageStore.emitChange();
      break;

    case AppConstants.RECEIVE_MESSAGES:
      _messages = {};
      _messages = action.data;
      MessageStore.emitChange();
      break;

    default: 
      return true;
  }
});

module.exports = MessageStore;
