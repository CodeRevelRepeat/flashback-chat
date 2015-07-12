'use strict';

var express = require('express'),
    app = express(),
    models  = require('./models'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    messageController = require('./messages/messageController');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist/'));

// configure server with all the middleware and and routing
require('./middleware.js')(app, express);

app.set('port', (process.env.PORT || 3000));

models.sequelize.sync();

server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
}) 


// initialize socket communication 
io.on('connection', function(socket) {

  socket.on('send message', function(message) {
    // Insert that message to database
    messageController.createMessage(message);

    // Send that message to everyone.
    io.emit('new message', message);
  });

});


module.exports = app;



