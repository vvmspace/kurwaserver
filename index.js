var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');
var rclient = redis.createClient();
var profiles = [];
var users = [];

app.get('/', function(req, res){
    res.sendFile('index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('a user connected');
    console.log(socket.id);
    socket.emit('message', "<div style='background:red; color: white;'>Kuurwaa!</div>");

    socket.on('disconnect', function () {
        console.log('user disconnected', socket.id);
    });

    socket.on('profile', function(value) {
        console.log('recieved profile: ', value);
    });

    socket.on('push', function(value){
        console.log(value);
        io.sockets.emit('push', value);
        if(value == 'Kurwa!'){
            io.sockets.emit('message','<h1>Pierdolicz!</h1>');
        }
    })
});
io.clients(function(error, clients){
    if (error)
        throw error;
    console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
});