var express = require("express");
var router = express.Router();
let User = require("../models/user");
const { util, statusCode, responseMessage } = require("../modules");
const fs = require("fs");
const encrypt = require("../modules/crypto");
// const jwt = require("jsonwebtoken");
const jwt2 = require("../modules/jwt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const result = {
    status: statusCode.OK,
    message: "user",
  };
  res.status(statusCode.OK).send(result);
});

// 비밀번호 해시값
router.post("/signup", async (req, res) => {
  const { id, name, password, email } = req.body;

  try {
    if (!id || !name || !password || !email) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    if (await User.checkUser(id)) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
    }

    const { salt, hashed } = await encrypt.encrypt(password);

    const idx = await User.signup(id, name, hashed, salt, email);
    if (idx === -1) {
      return res
        .status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, responseMessage.DB_ERROR));
    }

    res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.CREATED_USER, {
        idx,
      })
    );
  } catch (e) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.FAIL_TO_UPDATE
        )
      );
  }
});

router.post("/signin", async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  if (!(await User.checkUser(id))) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, await User.checkUser(id)));
  }

  const user = await User.getUserById(id);

  const hashed = await encrypt.encryptWithSalt(password, user.salt);
  if (user.password !== hashed) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
  }

  // const { token } = await jwt.sign(user);

  const payload = {
    idx: user.userIdx,
    name: user.name,
  };

  const { token } = await jwt2.sign(user);
  console.log(token);

  //로그인 성공

  return res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
      id,
      name: user.name,
      password: user.password,
      hashed: user.hashed,
      access: token,
    })
  );

  return res
    .status(statusCode.BAD_REQUEST)
    .send(
      util.fail(statusCode.BAD_REQUEST, responseMessage.INTERNAL_SERVER_ERROR)
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

  // 성공
  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
      id,
      name: user[0].name,
      email: user[0].email,
    })
  );
});

module.exports = router;
