var express = require("express");
var router = express.Router();
const imageController = require("../controllers/image.js");
const authMiddleware = require("../middlewares/auth");
const upload = require("../modules/multer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/user", require("./user"));
router.use("/auth", require("./auth"));
router.use("/blog", require("./blog"));
router.post(
  "/image",
  authMiddleware.checkToken,
  upload.array("images", 3),
  imageController.array
);

module.exports = router;
