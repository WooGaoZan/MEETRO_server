var mysql = require('mysql');

var con = mysql.createConnection({
  host: "172.17.241.70",
  user: "kugwa",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
