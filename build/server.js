'use strict';
var WebSocket = require('ws');
var models = require('./models');

var port = process.env.PORT || 3000;
var WebSocketServer = WebSocket.Server
, wss = new WebSocketServer({host:'127.0.0.1', port:port});
//var server = new WebSocketServer({ port: port });
// list of currently connected clients (users)
var clients = [ ];
var sid = 0;
wss.on('connection', function (ws) {
    sid = sid+1;
    console.log("Connection made from user No.: " + sid)
    ws.on('message', function (message) {
        try  {
            //var userMessage = new models.UserMessage(message);
            var uMessage = JSON.parse(message)
            var mName = uMessage.name;
            var mMsg = uMessage.message;
            var jMessage = {"sid": sid, "name": mName, "message": mMsg+sid};
            wss.broadcast(JSON.stringify(jMessage));
        } catch (e) {
            console.error(e.message);
        }
    });

    ws.on('close', function() {
            console.log((new Date()) + ws.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            //clients.splice(index, 1);
            // push back user's color to be reused by another user
            //colors.push(userColor);
        //}
    });
});


wss.broadcast = function broadcast(data) {
    var i = 0;
  wss.clients.forEach(function each(client) {
    console.log("Sending message No: "+ ++i);
    client.send(data);
  });
};

/*function broadcast(data) {
    var i = 0;
    server.clients.forEach(function (client) {
        console.log("Sending message No: " + ++i);
        client.send(data);
    });
};*/

console.log('Server is running on port ', port);


