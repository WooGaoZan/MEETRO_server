var mysql = require('mysql');

var con = mysql.createConnection({
  host: "0.0.0.0",
  user: "kugwa",
  password: "",
  port: 2021,
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM user WHERE u_id = 1", function (err, result) {
    if (err) throw err;
    console.log(result[0]['RowDataPacket']);
  });
});
