
'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({

  displayName: 'Login',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    var name = window.localStorage.getItem('flashbackChat');

    if(name){
      this.transitionTo('/chat');
    }

    return {
      username: name
    };
  },

  handleLogin: function(event) {
    event.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    window.localStorage.setItem('flashbackChat', name);
    this.setState ({
      username: name
    });
    this.transitionTo('/chat');
  },


  render: function() {

    var header = "Chat like it's 1999";

    return (

    <div className="login">
      <div>
        <h1 className="chat-header">{header}</h1>
        <form onSubmit={this.handleLogin} className="formContainer">
          <input type="name" id="right-label" className="user-name" placeholder="Enter your name" ref="name" />
          <div>
            <input type="submit" className="loginButton button" value="Start Chatting!" align="right" />
          </div>
        </form>
      </div>
    </div>

    );
  }
});

module.exports = Login;