var express = require("express");
var router = express.Router();
var path = require("path");
const index = require("./api");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/blog", require("./blog"));

module.exports = router;
