var http = require('http');
var url = require('url');
var io = require('socket.io').listen(app)
var fs = require('fs');
var mysql = require('mysql');

var app = require('http').createServer(handler)
app.listen(1337);

function handler (req, res) {
  if(req.url=='/'){
              res.writeHead(200,{'Content-Type':'text/html'});
	      console.log(1);
              console.log(req.url);
	      console.log(typeof(req.url));
              console.log(req.url.toString);	
	      res.write('<html><body>This is Home Page.</body></html>');
              res.end();
          }else if(req.url=='/student'){
              res.writeHead(200,{'Content-Type':'text/html'});
              res.write('<html><body>This is student Page.</body></html>');
              res.end();
          }else if(req.url=='/admin'){
              res.writeHead(200,{'Content-Type':'text/html'});
              res.write('<html><body>This is admin Page.</body></html>');
              res.end();
          }else if(req.url.includes('/user='))
          // route for getting user id
              {
                uid = user_func(req.url);
                con.connect(function(err) {
                  if (err) throw err;
                  con.query("SELECT * FROM user WHERE u_id = "+ uid , function (err, result, fields) {
                    if (err) throw err;
		    console.log(result)
                });
              });
//           parse data

//           send data
               res.writeHead(200,{'Content-Type':'text/html'});
               res.write('<html><body>This is admin Page.</body></html>');
               res.end();

              }

 fs.readFile(__dirname + '/chat.html', function (err, data) {
     if (err) {
                res.writeHead(500);
         return res.end('Error loading chat.html');
            }
     res.writeHead(200);
     res.end(data);
        });
}

function user_func(req_url) {
  return req_url.charAt(6);
}
io.sockets.on('connection', function (socket) {
 socket.on('addme',function(username) {
  socket.username = username;
  socket.emit('chat', 'SERVER', 'You have connected');
  socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
 });
 socket.on('sendchat', function(data) {
  io.sockets.emit('chat', socket.username, data);
 });

 socket.on('disconnect', function() {
  io.sockets.emit('chat', 'SERVER', socket.username + ' has left the building');
 });
});

var con = mysql.createConnection({
  host: "localhost",
  port: "2021",
  user: "kugwa",
  password: "",
  database: "mydb"
});
