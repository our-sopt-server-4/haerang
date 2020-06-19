var express = require('express');
var router = express.Router();

const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const userModel = require('../models/user');

router.get('/recommend/:uid', async(req, res) => {
  const uid = req.params.uid;

  try{
    const recommendUser = await userModel.recommendUser(uid);

    return res.status(statusCode.OK).send(util.success(statusCode.OK, "추천 아이디 조회 성공", recommendUser));
  }catch(err){
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, err.message));
      throw err;
  }
  

  
});

module.exports = router;
