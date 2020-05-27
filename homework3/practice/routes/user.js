var express = require("express");
var router = express.Router();
let User = require("../models/user");
let util = require("../modules/util");
let statusCode = require("../modules/statusCode");
let resMessage = require("../modules/responseMessage");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 1단계
// router.post("/signup", async (req, res) => {
//   const { id, name, password, email } = req.body;
//   User.push({ id, name, password, email });
//   res.status(200).send(User);
// });

//2단계
// router.post("/signup", async (req, res) => {
//   const { id, name, password, email } = req.body;
//   // request data 확인 - 없다면 Bad Request 반환
//   if (!id || !name || !password || !email) {
//     // 하나라도 없다면
//     return res.status(400).send({ message: "BAD REQUEST" });
//   }
//   //already ID
//   if (User.filter((user) => user.id == id).length > 0) {
//     return res.status(400).send({ message: "ALREADY ID EXISTS" });
//   }
//   User.push({ id, name, password, email });
//   res.status(200).send(User);
// });

//3단계
router.post("/signup", async (req, res) => {
  const { id, name, password, email } = req.body;
  // request data 확인 - 없다면 Null Value 반환
  if (!id || !name || !password || !email) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }
  //already ID
  if (User.filter((user) => user.id == id).length > 0) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    return;
  }
  User.push({
    id,
    name,
    password,
    email,
  });
  res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.CREATED_USER, {
      userId: id,
    })
  );
});

router.post("/signin", async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  const user = User.filter((user) => user.id === id);
  if (user.length == 0) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  if (user[0].password !== password) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    return;
  }

  res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
      userId: id,
    })
  );
});

// 프로필 조회 구현
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  const user = User.filter((user) => user.id === id);
  if (user.length == 0) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
      userId: id,
      name: user[0].name,
      email: user[0].email,
    })
  );
});

module.exports = router;
