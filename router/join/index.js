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

router.get("/", function(req, res) {
  res.render("join.ejs");
});

router.post("/", function(req, res) {
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var pw = body.password;

  var sql = {
    email: email,
    name: name,
    pw: pw
  };

  var query = connection.query("INSERT INTO USER SET ?", sql, function(err, rows) {
    if (err) {
      throw err;
    }
    res.render("welcome.ejs", { "name" : name, "id" : rows.insertId });
  });
});

module.exports = router;
