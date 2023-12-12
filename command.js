//create web server
const express = require('express');
const app = express();
const port = 3000;

//create web server
const http = require('http');
const server = http.createServer(app);

//create socket server
const { Server } = require("socket.io");
const io = new Server(server);

//send html to client
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//listen to client
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    //console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

//listen to port
server.listen(port, () => {
  console.log('listening on *:' + port);
});