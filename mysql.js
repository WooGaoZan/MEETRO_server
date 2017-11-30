var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "kugwa",
    port: 2021,
    password: "",
    database: "mydb"
});







con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM user", function (err, result) {
          if (err) throw err;
          console.log(result[0].u_id);
      });

});
