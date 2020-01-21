var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");

// Database 연동
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "apcnfl77",
  database: "nodedb"
});

connection.connect();

router.post("/form", function(req, res) {
  console.log(req.body); // Object
  console.log(req.body.email);
  // res.send("<h1>Welcome! " + req.body.email + "</h1>");
  res.render("email.ejs", { email: req.body.email });
});

router.post("/ajax", function(req, res) {
  var email = req.body.email;
  var responseData = {};

  var query = connection.query(
    "SELECT name FROM user WHERE email = '" + email + "'",
    function(err, rows) {
      // callback 함수
      if (err) throw err;
      if (rows[0]) {
        responseData.result = "ok";
        responseData.name = rows[0].name;
      } else {
        responseData.result = "none";
        responseData.name = "";
      }
      res.json(responseData);
    }
  );
});

module.exports = router;
