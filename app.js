var express = require("express");
var app = express(); // express 가 함수이기 때문에 호출하여 받은 리턴값을 app 에 담아 사용
var bodyParser = require("body-parser"); // post 로 요청된 body 를 쉽게 추출 가능한 모듈

app.listen(3000, function() {
  // 비동기로 동작
  console.log("start! express server on port 3000!");
});

app.use(express.static("public"));
app.use(bodyParser.json()); // json 파싱을 지원
app.use(bodyParser.urlencoded({ extended: true })); // js 의 Object 를 상속 받아 obj.toString() 과 같은 메소드 사용이 가능
app.set("view engine", "ejs"); // view 엔진으로 ejs 를 사용할 것임을 지정

// url routing
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", function(req, res) {
  // get 요청일 경우 req.param("email") 이렇게 파라미터 추출 가능
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function(req, res) {
  console.log(req.body); // Object
  console.log(req.body.email);
  // res.send("<h1>Welcome! " + req.body.email + "</h1>");
  res.render("email.ejs", { email: req.body.email });
});

app.post("/ajax_send_email", function(req, res) {
  console.log(req.body.email);
  // check validation about input value => select db
  var responseData = { result: "OK", email: req.body.email };
  res.json(responseData);
});
