const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blog");

router.post("/", blogController.newPost);
router.get("/:blogidx", blogController.getBlogByIdx);
router.put("/:blogidx", blogController.updateBlog);
router.delete("/:blogidx", blogController.deleteBlog);

module.exports = router;
