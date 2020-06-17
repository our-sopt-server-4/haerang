var express = require("express");
var router = express.Router();
let UserModel = require("../models/user");
let util = require("../modules/util");
let statusCode = require("../modules/statusCode");
let responseMessage = require("../modules/responseMessage");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const result = {
    status: statusCode.OK,
    message: "user",
  };
  res.status(statusCode.OK).send(result);
});

router.post("/signup", async (req, res) => {
  const { id, name, password, email } = req.body;

  if (!id || !name || !password || !email) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  if (UserModel.filter((user) => user.id == id).length > 0) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
  }

  UserModel.push({ id, name, password, email });
  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.CREATED_USER, {
      id,
      name,
      email,
    })
  );
});

router.post("/signin", async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // 존재하는 ID 확인
  const user = UserModel.filter((user) => user.id == id);
  if (user.length == 0) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  //비밀번호 확인
  if (user[0].password !== password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
  }

  //로그인 성공
  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
      id,
      name: user[0].name,
    })
  );
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  // 존재하는 ID 확인
  const user = UserModel.filter((user) => user.id == id);
  if (user.length == 0) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  //조회 성공
  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
      id,
      name: user[0].name,
      email: user[0].email,
    })
  );
});

module.exports = router;
