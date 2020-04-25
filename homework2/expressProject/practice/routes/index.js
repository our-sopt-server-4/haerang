var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/api", require("./api"));
router.use("/blog", require("./blog"));

module.exports = router;
