var socket = new WebSocket('ws://localhost:3000');

socket.onmessage = function(message){
  console.log('Connection', message.data);
};

//allow pasting
var socket2 = new WebSocket('ws://localhost:3000');

socket2.onmessage = function(message){
  console.log('Connection 2', message.data);
};

var socket3 = new WebSocket('ws://localhost:3000');

socket3.onmessage = function(message){
  console.log('Connection 3', message.data);
};



socket2.send(JSON.stringify({"name": "Derek", "message":"Hi" }));