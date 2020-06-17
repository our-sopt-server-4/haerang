var express = require("express");
var router = express.Router();
let UserModel = require("../models/user");
const { util, statusCode, responseMessage } = require("../modules");
const fs = require("fs");
const crypto = require("crypto");

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

    if (UserModel.filter((user) => user.id == id).length > 0) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
    }
    const salt = crypto.randomBytes(32).toString("hex");
    const hashed = crypto
      .pbkdf2Sync(password, salt, 1, 32, "sha512")
      .toString("hex");

    UserModel.push({ id, name, hashed, salt, email });
    res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.CREATED_USER, {
        id,
        hashed,
        salt,
        name,
        email,
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

  try {
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

    const hashed = crypto
      .pbkdf2Sync(password, user[0].salt, 1, 32, "sha512")
      .toString("hex");
    if (user[0].hashed !== hashed) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
    }
    //비밀번호 확인
    // if (user[0].password !== password) {
    //   return res
    //     .status(statusCode.BAD_REQUEST)
    //     .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
    // }

    //로그인 성공
    res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
        id,
        name: user[0].name,
        password: user[0].password,
        hashed: user[0].hashed,
      })
    );
  } catch (e) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }
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
