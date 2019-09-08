var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});


var messages = [];
var users = [];

io.on('connection', function(socket){

  // サーバー側のメッセージリストをクライアント側に送る（emit）
  socket.emit('init-chat', messages);
  // クライアント側から送られたメッセージを受け取り、全クライアントに送る（emit）
  socket.on('c2s-msg', function(msg) {
      var newMessage = msg;
      messages.push(newMessage);
      io.emit('s2c-msg', newMessage);
  });

});

// httpサーバーを立てる
http.listen(port, function(){
  console.log('listening on *:' + port);
});
