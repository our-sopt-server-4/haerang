var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const selfieController = require("../controllers/selfie");
const AuthMiddleware = require("../middlewares/auth");
const upload = require("../modules/multer");
// const multer = require("multer");
// const upload = multer({
//   dest: "upload/",
// });

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post(
  "/profile",
  AuthMiddleware.checkToken,
  upload.single("profile"),
  userController.updateProfile
);

router.post(
  "/selfies",
  AuthMiddleware.checkToken,
  upload.array("selfies", 4),
  selfieController.updateSelfies
);

module.exports = router;
