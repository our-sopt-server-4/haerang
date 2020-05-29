var express = require("express");
var router = express.Router();
let statusCode = require("../modules/statusCode");
let util=require('../modules/util');
let resMessage = require("../modules/responseMessage");
let Post=require('../models/posts');
let moment=require('moment');


//게시글 생성 
router.post('/', async(req,res)=>{
    const {author,title,contents}=req.body;

    if(!author || !title || !contents){
        res.status(statusCode.BAD_REQUEST).
        send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
        return;
    }
    const id=parseInt(Post[Post.length-1].id)+1;
    const date=moment().format('yyyy-MM-DD');
    Post.push({id,author,title,contents,date});
    const post = Post.filter(post => post.id == id);
    res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.CREATED_POST, 
    post[0])
  )
    
})

module.exports=router;