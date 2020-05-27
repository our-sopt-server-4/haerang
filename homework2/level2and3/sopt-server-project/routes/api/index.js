var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  const result = {
    status: 200,
    message: "Hello API~!! ^^",
  };
  res.status(200).send(result);
});

router.get("/blog/post", (req, res) => {
  const result = {
    status: 200,
    message: "/api/blog/post에 오셨네요 ",
  };
  res.status(200).send(result);
});

router.get("/users/login", (req, res) => {
  const result = {
    status: 200,
    message: "사용자 로그인 성공(찡끗)",
  };
  res.status(200).send(result);
});

router.get("/users/signup", (req, res) => {
  const result = {
    status: 200,
    message: "회원가입해주세요~~~",
  };
  res.status(200).send(result);
});

module.exports = router;
