var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 1단계
router.post("/signup", async (req, res) => {
  const { id, name, password, email } = req.body;
  User.push({ id, name, password, email });
  res.status(200).send(User);
});

module.exports = [
  {
    id: "gngsn",
    name: "박경선",
    password: "qwerty",
    email: "gngsn@gmail.com",
  },
  {
    id: "EZYOON",
    name: "이지윤",
    password: "fl0wer",
    email: "gngsn@gmail.com",
  },
  {
    id: "wjdrbs",
    name: "최정균",
    password: "password",
    email: "wjdrbs@gmail.com",
  },
];
