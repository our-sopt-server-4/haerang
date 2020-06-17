var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "해랑서버" });
});

router.use("/user", require("./user"));
router.use("/post", require("./post"));

module.exports = router;
