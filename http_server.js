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
          }else if(req.url.includes('/user?'))
          // route for getting user id
              {
                uid = user_func(req.url);
                con.connect(function(err) {
                  if (err) throw err;
                  con.query("SELECT * FROM user WHERE u_id = "+ uid ,function (err, result, fields) {
                    if (err) throw err;
                      // res.writeHead(200,{'Content-Type':''});
                      // res.write(result);
                      // res.end(result);

                });
              });
              // res.writeHead(200,{'Content-Type':'JSON'});
              // res.write(result);
              // res.end();
              }else if(req.url.includes('/userwish?'))
              // route for getting user id
               {
                 con.connect(function(err) {
                   user_wish = userwish_func(req.url);
                   if (err) throw err;
                   // var sql = "INSERT INTO user_wish (u_id, wish) VALUES ("+user_wish[0]+","+user_wish[1]+")";
                   var sql = "INSERT INTO user_wish (u_id, wish) VALUES ("+user_wish[0]+','+user_wish[1]+")";
                   console.log(sql);
                   con.query(sql, function (err, result) {
                     if (err) throw err;
                     console.log("1 record inserted");
                   });
               });
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write('<html><body>This is User Wish Page.</body></html>');
                res.end();

              }else if(req.url.includes('/wishlist?'))
               // route for getting user id
                   {
                     con.connect(function(err) {
                      if (err) throw err;
                      con.query("SELECT * FROM user_wish", function (err, result, fields) {
                        if (err) throw err;
                        console.log(result);
                      });
                   });
     //           parse data

     //           send data
                    res.writeHead(200,{'Content-Type':'text/html'});
                    res.write('<html><body>This is Dicuss Page.</body></html>');
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

// parse req_url
function user_func(req_url) {
  return req_url.charAt(6);
}

function userwish_func(req_url) {
  a = req_url.substring(req_url.lastIndexOf("u=")+2,req_url.lastIndexOf("&"));
  b = req_url.substring(req_url.lastIndexOf("w=")+2,req_url.length);
  b = '\''+b+'\''
  console.log(a);
  console.log(b);
  return [a,b];
}


// SOCKETS
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
  port: "2020",
  user: "kugwa",
  password: "",
  database: "mydb"
});
