"use strict";

module.exports = function(app, express) {
  var messageRouter = express.Router();
  app.use('/api/messages', messageRouter);
  require('./routes/messageRoutes.js')(messageRouter);


};