const express = require("express");
const router = express.Router();
const PostController = require("../controller/PostController");


router.get('/', [], PostController.index);

router.get('/:post_id/show/', [], PostController.show);

router.post('/store', [], PostController.store);

router.post('/:post_id/update', [], PostController.update);

router.post('/:post_id/destroy', [], PostController.destroy);


module.exports = router;
