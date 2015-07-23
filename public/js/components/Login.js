
'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
 var info;

var Login = React.createClass({

  displayName: 'Login',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    var name = window.localStorage.getItem('flashbackChat');

   
    var data = false;

    //call api endpoint

    if(!data){

    $.ajax({
      url: 'http://gfycat.com/cajax/getTrendingTags',
      dataType: 'jsonp',
      type: 'GET',
      success: function(result){
          console.log(result);

          info = result;

          // this.setState ({
          //   info: result
          // });
        if(!result.data){
            // console.log("Error message from Gfy", result.meta.error_message);
           
        } else {

            console.log(result);
          }

        },
        error: function(xhr, status, error){
          console.error(xhr, status, error)
          next(null, photoInfo);
        }
      })

    };


    if(name){
      this.transitionTo('/chat');
    }

    return {
      username: name,
      info: info
    };
  },

  searchGfy: function(event) {
    event.preventDefault();

    // this.setState ({
    //   info: info
    // });
    var name = React.findDOMNode(this.refs.name).value.trim();
    // window.localStorage.setItem('flashbackChat', name);
    // console.log("this.state", this.state);
    // console.log("info.tagList", this.state.info.tagList)
    console.log("info", info.tagList[0].gfyList[0]);
    var pic;
    for(var i=0; i< info.tagList[0].gfyList.length; i++){
      if(info.tagList[0].gfyList[i].title){
      if(info.tagList[0].gfyList[i].title.indexOf(name)){
        console.log("the stuff", info.tagList[0].gfyList[i]);
          // pic = "http://giant.gfycat.com/ObeseBonyAntarcticgiantpetrel.gif"

          pic = info.tagList[0].gfyList[i].gifUrl;
          // pic = info.tagList[0].gfyList[i].title
          console.log("pic", pic);
      }

    }


    }




    this.setState ({
      pic: pic
    });
    // this.transitionTo('/chat');



  },


  render: function() {
    // console.log("this.state", this.state)
    // console.log("info.tagList", this.state.info.tagList)

    var header = "Chat like it's 1999";
    var self = this;
    console.log("self", self);

    return (

    <div className="login">
      <div>
        <h1 className="chat-header">{header}</h1>
        <img src= {self.state.pic} />
        <form onSubmit={this.searchGfy} className="formContainer">
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