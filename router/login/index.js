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

  res.render("login.ejs", { "message" : msg });
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

passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req, email, password, done) {
    var query = connection.query("SELECT * FROM USER WHERE email = ?", [email], function(err, rows) {
      if (err) return done(err);

      if (rows.length) {  // 로그인 성공
        console.log("login success!");
        return done(null, { "email" : email, "id" : rows[0].uid });

      } else {  // 로그인 실패
        console.log("login fail!");
        return done(null, false, { "message" : "Your login info is not found T.T"});
      }
    })
  })
);

// Ajax 요청 의 경우 json 형태로 응답하기를 원함 -> custom callback 이용
router.post("/", function(req, res, next) {
  passport.authenticate("local-login", function(err, user, info) {
    if (err) res.status(500).json(err);
    if (!user) return res.status(401).json(info.message);

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
});

module.exports = router;