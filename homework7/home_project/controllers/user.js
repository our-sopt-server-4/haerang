let User = require("../models/user");
const { util, statusCode, responseMessage } = require("../modules");
const encrypt = require("../modules/crypto");
const jwt = require("../modules/jwt");

const user = {
  signup: async (req, res) => {
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

      return res.status(statusCode.OK).send(
        util.success(statusCode.OK, responseMessage.CREATED_USER, {
          idx,
        })
      );
    } catch (e) {
      throw e;
    }
  },
  signin: async (req, res) => {
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

    const { token } = await jwt.sign(user);
    // console.log(token);

    //로그인 성공

    return res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
        id,
        name: user.name,
        password: user.password,
        hashed: user.hashed,
        accessToken: token,
      })
    );

    return res
      .status(statusCode.BAD_REQUEST)
      .send(
        util.fail(statusCode.BAD_REQUEST, responseMessage.INTERNAL_SERVER_ERROR)
      );
  },
  readProfile: async (req, res) => {
    const { id } = req.params;
    // 존재하는 ID 확인
    const user = await User.getUserById(id);
    console.log(user);

    // 성공
    return res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.READ_PROFILE_SUCCESS, {
        name: user.name,
        id: user.id,
      })
    );
  },
  updateProfile: async (req, res) => {
    const userIdx = req.decoded.userIdx;
    const profileImg = req.file.location;
    console.log(req.file);
    // data check - undefined
    if (profileImg === undefined || !userIdx) {
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    // image type check
    const type = req.file.mimetype.split("/")[1];
    if (type !== "jpeg" && type !== "jpg" && type !== "png") {
      return res
        .status(statusCode.OK)
        .send(util.fail(statusCode.OK, responseMessage.UNSUPPORTED_TYPE));
    }
    // call model - database
    const result = await User.updateProfile(userIdx, profileImg);
    res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.UPDATE_PROFILE_SUCCESS,
          result
        )
      );
  },
};

module.exports = user;
