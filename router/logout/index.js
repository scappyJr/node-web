var express = require("express");
var app = express();
var router = express.Router();

router.get("/", function(req, res) {
  req.logOut();
  res.redirect("/login");
})

module.exports = router;