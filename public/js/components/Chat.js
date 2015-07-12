'use strict';

var React = require('react');
var MessageSection = require('./ChatMessageSection');
var MessageSubmit = require('./ChatMessageSubmit');

var Chat = React.createClass({

  render: function() {
    return (
        <div className="chat-window" ref="chat">
          <MessageSection />
          <MessageSubmit />
        </div>
    );
  }
});

module.exports = Chat;