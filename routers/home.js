const express = require("express");
const router = express.Router();
const HomeController = require("../controller/HomeController");

router.get('/', [], HomeController.index);

router.post('/upload/image', [], HomeController.uploadImage);


module.exports = router;
