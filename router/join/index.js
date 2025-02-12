var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

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
  var msg;
  var errMsg = req.flash("error");

  if (errMsg) msg = errMsg;

  res.render("join.ejs", { "message" : msg });
});

// session 에 user 정보 저장
passport.serializeUser(function(user, done) {
  console.log("passport session save : ", user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("passport session getdata : ", id);
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  done(null, id);
});

passport.use("local-join", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req, email, password, done) {
    var query = connection.query("SELECT * FROM USER WHERE email = ?", [email], function(err, rows) {
      if (err) return done(err);

      if (rows.length) {
        console.log("existed user!");
        return done(null, false, { message: "Your email is already used."});
      } else {
        console.log("available user!");
        var sql = { email: email, pw: password, name : "" };
        var query = connection.query("INSERT INTO USER SET ?", sql, function(err, rows) {
          if (err) { throw err; }
          return done(null, { "email" : email, "id" : rows.insertId });
        });
      }
    })
  })
);

router.post("/", passport.authenticate("local-join", {
  successRedirect: "/main",
  failureRedirect: "/join",
  failureFlash: true
}));

/* router.post("/", function(req, res) {
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
*/

module.exports = router;
