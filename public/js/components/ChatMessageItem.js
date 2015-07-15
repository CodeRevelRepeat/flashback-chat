'use strict';

var React = require('react');
var ReactEmojiMixin = require('react-emoji');
var moment = require('moment');

var lastAuthor = null;

var MessageItem = React.createClass({
  mixins: [
    ReactEmojiMixin
  ],

  render: function() {
    var message = this.props.message;
    var date = new Date(message.createdAt);
    var prettyDate = moment(date).fromNow();
    var author;
    if(this.props.message.code %2){
      author = <span className="message-author author-blue">{message.authorName}</span>;
    } else {
      author = <span className="message-author author-red">{message.authorName}</span>;
    }

    return (
      <li className="message-item">
        {author}: <span className="message-text">{ this.emojify(message.text, {emojiType: 'emojione'}) }</span>
          
          <div className="message-date-wrapper">
            <span className="message-date">{ prettyDate }</span>
          </div> 
      </li>
    );
  }
});

module.exports = MessageItem; 