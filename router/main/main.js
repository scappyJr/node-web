var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

// main page 는 login 한 상태일 때만 (= 세션 정보가 있을 때만) 접근이 가능하게 한다.
router.get("/", function(req, res) {
  // get 요청일 경우 req.param("email") 이렇게 파라미터 추출 가능
  var id = req.user;
  if (!id) res.render("login.ejs");
  res.render("main.ejs", { "id" : id });
});

module.exports = router; // router 를 다른 곳으로 export 처리
