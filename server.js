var express = require('express');
var server = express();

server.use(express.static('client/build'));

server.listen(3000, function() {
  console.log('app is listening on port 3000');
})
