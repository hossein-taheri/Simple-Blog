const express = require("express");
const router = express.Router();
const UploadController = require("../controller/UploadController");
const Upload = require("../middleware/Upload")

router.post('/images', [Upload.index], UploadController.uploadImage);


module.exports = router;
