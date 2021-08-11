const express = require("express");
const router = express.Router();
const PostController = require("../controller/PostController");
const PostValidator = require("../middleware/validators/PostValidator");

router.get('/', [PostValidator.index], PostController.index);

router.get('/show/:post', [PostValidator.show], PostController.show);

router.post('/store', [PostValidator.store], PostController.store);

router.patch('/update/:post', [PostValidator.update], PostController.update);

router.delete('/destroy/:post', [PostValidator.destroy], PostController.destroy);


module.exports = router;
