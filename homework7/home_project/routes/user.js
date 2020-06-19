var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const AuthMiddleware = require("../middlewares/auth");
const multer = require("multer");
const upload = multer({
  dest: "upload/",
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
// router.get("/profile/:id", userController.readProfile);
router.post(
  "/profile",
  AuthMiddleware.checkToken,
  upload.single("profile"),
  userController.updateProfile
);

module.exports = router;
