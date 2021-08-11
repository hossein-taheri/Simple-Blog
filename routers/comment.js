const express = require("express");
const router = express.Router();
const CommentController = require("../controller/CommentController");
const CommentValidator = require("../middleware/validators/CommentValidator")

router.post('/post/:post/store', [CommentValidator.store], CommentController.store);

router.delete('/post/:post/destroy/:comment', [CommentValidator.destroy], CommentController.destroy);


module.exports = router;
