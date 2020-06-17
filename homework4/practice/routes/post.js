var express = require("express");
var router = express.Router();
let statusCode = require("../modules/statusCode");
let util = require("../modules/util");
let resMessage = require("../modules/responseMessage");
let Post = require("../models/posts");
let moment = require("moment");

//모든 게시글 조회
router.get("/", async (req, res) => {
  const result = await Post.getAllPost();
  return res
    .status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_ALL_POSTS, result));
});

module.exports = router;
