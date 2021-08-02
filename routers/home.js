const express = require("express");
const router = express.Router();
const HomeController = require("../controller/HomeController");
const HomeValidator = require("../middleware/validators/HomeValidator")

router.get('/', [HomeValidator.index], HomeController.index);


module.exports = router;
