var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

router.get("/", function(req, res) {
  // get 요청일 경우 req.param("email") 이렇게 파라미터 추출 가능
  console.log("[info] main js loaded...", req.user);
  var id = req.user;
  // res.sendFile(path.join(__dirname, "../../public/main.html"));
  res.render("main.ejs", { "id" : id });
});

module.exports = router; // router 를 다른 곳으로 export 처리
