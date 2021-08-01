const express = require("express");
const router = express.Router();
const CommentController = require("../controller/CommentController");


router.post('/comment/post/:post_id/store', [], CommentController.store);

router.post('/comment/post/:post_id/destroy/:comment_id', [], CommentController.destroy);


module.exports = router;
