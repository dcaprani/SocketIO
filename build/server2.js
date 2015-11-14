'use strict';
var WebSocket = require('ws');
var models = require('./models');
var url = require('url');

var port = process.env.PORT || 3000;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });

server.on('connection', function (ws) {
    var ip = url.parse(ws.upgradeReq.url, true);
    //var ip = webSocketConnection.socket.remoteAddress;
    console.log("Connection in from" + ip);
    //possible testing function ????
    //var id = setInterval(function() {
      // console.log(JSON.stringify(process.memoryUsage()));
        //ws.send(JSON.stringify(process.memoryUsage()), function() { /* ignore errors */ });
    //}, 10);
    //console.log('started client interval');
192.168.1.71

    ws.on('message', function (message) {
        try  {
            //var userMessage = new models.UserMessage(message);
            var JSONObj = JSON.stringify(message);
            broadcast(JSON.parse(JSONObj));
        } catch (e) {
            console.error(e.message);
        }
    });

   /* ws.on('close', function() {
        console.log('stopping client interval');
        clearInterval(id);
    });*/
});

function broadcast(m) {
    var i = 0;
    server.clients.forEach(function (client) {
        console.log("Sending message No. " + ++i);
        console.log(m);
        console.log(JSON.stringify(process.memoryUsage()));
        client.send(m);
    });
};

console.log('New server 2 is running on port', port);