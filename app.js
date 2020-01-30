var express = require("express");
var app = express(); // express 가 함수이기 때문에 호출하여 받은 리턴값을 app 에 담아 사용
var bodyParser = require("body-parser"); // post 로 요청된 body 를 쉽게 추출 가능한 모듈
var router = require("./router/index");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var flash = require("connect-flash");

app.listen(3000, function() {
  // 비동기로 동작
  console.log("start! express server on port 3000!");
});

// middleware
app.use(express.static("public"));
app.use(bodyParser.json()); // json 파싱을 지원
app.use(bodyParser.urlencoded({ extended: true })); // js 의 Object 를 상속 받아 obj.toString() 과 같은 메소드 사용이 가능
app.set("view engine", "ejs"); // view 엔진으로 ejs 를 사용할 것임을 지정

// express-session 설정
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// url routing
app.use(router); // app.use("/", router); 와 같은 의미
