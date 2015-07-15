'use strict';

var React = require('react');
var MessageSection = require('./ChatMessageSection');
var MessageSubmit = require('./ChatMessageSubmit');

var Chat = React.createClass({

  render: function() {
    var header = "You've Got Chats";
    return (
        <div className="chat-window" ref="chat">
          <h1>{header}</h1>
          <MessageSection />
          <MessageSubmit />
        </div>
    );
  }
});

module.exports = Chat;