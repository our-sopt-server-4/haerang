var express = require("express");
var router = express.Router();
let statusCode = require("../modules/statusCode");
let util=require('../modules/util');
let resMessage = require("../modules/responseMessage");
let Post=require('../models/posts');
let moment=require('moment');

//모든 게시글 조회 
router.get('/',async(req,res)=>{

   res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.READ_ALL_POSTS,
      Post
    )
  );
});


//게시글 고유 아이디 값 조회 

router.get('/:id',async(req,res)=>{
    const {id}=req.params;

    if (!id) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  const post=Post.filter(post=>post.id===id);
  res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.READ_USER_ID,
      post[0]
    )
  );

})


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
    const post = Post.filter(post => post.id === id);
    res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.CREATED_POST, 
    post[0])
  )
    
})

// 게시글 고유 id값을 가진 게시글 수정 
router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const changed={author,title,contents}=req.body;

    if (!id) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  const post=Post.filter(post=>post.id===id);

    for(key in changed){
        post[0][`${key}`]=changed[`${key}`];
    }

    post[0]['date']=moment().format('YYYY-MM-DD');

  res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.CHANGED_USER_INFO,
      post[0]
    )
  );

})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    if (!id) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  if(Post.length<1){
       res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_POST));
    return;
  }

    const post=Post.filter(post=>post.id===id);
    Post.splice(id-1,1);

    res.status(statusCode.OK).send(
    util.success(statusCode.OK, resMessage.DELETE_SUCCESS, Post)
  );


})


module.exports=router;