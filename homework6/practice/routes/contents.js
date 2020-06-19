var express = require("express");
var router = express.Router();

const util = require("../modules/util");
const statusCode = require("../modules/statusCode");
const contentsModel = require("../models/contents");

router.get("/info/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const infoContents = await contentsModel.infoContents(uid);

    return res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, "콘텐츠 조회 성공", infoContents));
  } catch (err) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
    throw err;
  }
});

module.exports = router;
