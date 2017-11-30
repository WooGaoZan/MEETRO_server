var http = require('http');
var mysql = require('mysql');
var url = require('url');

var server = http.createServer(function (req, res) {

    if (req.url == '/data') { //check the URL of the current request
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: "Hello World"}));
            res.end();
    }else if(req.url.includes('/user?')){
      uid = user_func(req.url);
      // con.connect();
      con.query("SELECT * FROM user WHERE u_id = "+ uid ,function (err, result, fields) {
        if(err) throw err;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        console.log(1);
        res.write(JSON.stringify(result));
        res.end();
        // con_end();
      });

    }else if(req.url.includes('/userwish?')){
      user_wish = userwish_func(req.url);
      // con.connect();
      var sql = "INSERT INTO user_wish (u_id, wish) VALUES ("+user_wish[0]+','+user_wish[1]+")";
      con.query(sql ,function (err, result, fields) {
        if(err) throw err;
        console.log("1 record inserted");
      });
    }else if(req.url.includes('/wishlist?')){
      // con.connect();
      con.query("SELECT * FROM user_wish" ,function (err, result, fields) {
        if(err) throw err;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(result));
        res.end();
      });
    }
  });

server.listen(5000);

console.log('Node.js web server at port 5000 is running..')

function user_func(req_url) {
  return req_url.charAt(6);
}


var con = mysql.createConnection({
  host: "localhost",
  port: "2020",
  user: "kugwa",
  password: "",
  database: "mydb"
});

con.connect();
var someVar;
function setValue(value) {
  console.log(someVar);
  someVar = null;
  someVar = value;
  console.log(someVar);
}
function userwish_func(req_url) {
  a = req_url.substring(req_url.lastIndexOf("u=")+2,req_url.lastIndexOf("&"));
  b = req_url.substring(req_url.lastIndexOf("w=")+2,req_url.length);
  b = '\''+b+'\''
  console.log(a);
  console.log(b);
  return [a,b];
}

function con_end(){
  con.end();
}
