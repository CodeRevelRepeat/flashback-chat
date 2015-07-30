'use strict';

var Message = require('../models').Message;
var Clarifai = require('./clarifai_node.js');
Clarifai.initAPI("gpo48HRcufNAVheWKv83YnYuOQ7-coCyo2k8ORx6", "f5QXPZIfTjNVyw7Sj9CcKTEBf-BAa2ZfDqeJe_fX");
var stdio = require('stdio');
var commonResultHandler = require('./commonResultHandler.js');

module.exports = {
  // createMessage: function(message) {
  //   var newMessage = {
  //         text: message.text,
  //         authorName: message.authorName
  //       };
  //   Message.build(newMessage)
  //     .save()
  //     .catch(function(err) {
  //       console.error(err);
  //     });
  // },

  // getMessages: function(req, res, next) {
  //   Message.findAll({
  //     limit: 50,
  //     order: '"createdAt" DESC',
  //   })
  //     .then(function(messages) {
  //       res.send(messages.reverse());
  //     })
  //     .catch(function(error) {
  //       res.status(400).send(error);
  //     });
  // }


  getTags: function(picURL){

      console.log("called getTags")

      console.log(picURL.url)

      var array = picURL.url.split("?");

      var picURL = array[1];



      // var testImageURL = 'http://www.clarifai.com/img/metro-north.jpg';
      var testImageURL = picURL;
      var ourId = "test image"; // this is any string that identifies the image to your system

      // Clarifai.setRequestTimeout( 100 ); // in ms - expect: force a timeout response
      // Clarifai.setRequestTimeout( 100 ); // in ms - expect: ensure no timeout 

      Clarifai.tagURL( testImageURL , ourId, commonResultHandler );



  }


}