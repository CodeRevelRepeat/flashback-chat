
'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
 var info;

 var xmlToJson = function(xml) {
  
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
 };

var Login = React.createClass({

  displayName: 'Login',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    var name = window.localStorage.getItem('flashbackChat');

   
    var data = false;

    //call api endpoint

    if(!data){

  //   $.ajax({
  //     url: 'https://s3.amazonaws.com/neon-challenges/',
  //     headers: { 'Access-Control-Allow-Origin': '*' },
  //     crossDomain: true,
  //     dataType: 'jsonp xml',
  //     type: 'GET',
  //     success: function(result){


  //         result = xmlToJson(result);
  //         console.log(result);

  //         info = result;

  //         // this.setState ({
  //         //   info: result
  //         // });
  //       if(!result.data){
  //           // console.log("Error message from Gfy", result.meta.error_message);
           
  //       } else {

  //           console.log(result);
  //         }

  //       },
  //       error: function(xhr, status, error){
  //         console.error(xhr, status, error)
  //       }
  //     })

  //   };


  //   return {
  //     info: info
  //   };
  // },

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
        }
      })

    };


    return {
      info: info
    };
  },


  getTagsfromServer: function(url) {
    $.ajax({
      url: '/api/messages/tags',
      dataType: 'json',
      data: url,
      type: 'GET',
      success: function(data){
        console.log(data);
      }
    })
  },


  callTags: function(){

    event.preventDefault();

    var tenPhotos = [];

    for(var i=0; i< 10; i++){
        console.log("the stuff", info.tagList[0].gfyList[i]);
          // pic = "http://giant.gfycat.com/ObeseBonyAntarcticgiantpetrel.gif"

          var pic = info.tagList[0].gfyList[i].gifUrl;
          // pic = info.tagList[0].gfyList[i].title
          console.log("pic", pic);
          tenPhotos.push(pic);
      }

      this.setState ({
        tenPhotos: tenPhotos
      });


      this.getTagsfromServer(tenPhotos[0]);



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

    var header = "Neon Pics";
    var self = this;
    console.log("self", self);

    if(this.state.tenPhotos){

    var listItems = this.state.tenPhotos.map(function(item) {
      return <li><img src={item}/></li>;
    });

    } else {
      var listItems = <li></li>

    }

    return (

    <div className="login">
      <div>
        <h1 className="chat-header">{header}</h1>
        <ul>{listItems}</ul>
        <form onSubmit={this.callTags} className="formContainer">
          <input type="name" id="right-label" className="user-name" placeholder="Enter pic tag" ref="name" />
          <div>
            <input type="submit" className="loginButton button" value="Get Pics!" align="right" />
          </div>
        </form>
      </div>
    </div>

    );
  }
});

module.exports = Login;