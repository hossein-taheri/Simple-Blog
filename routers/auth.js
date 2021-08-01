const express = require("express");
const AuthController = require("../controller/AuthController");
const AuthValidator = require("../middleware/validators/AuthValidator");
const router = express.Router();


router.post('/login', [AuthValidator.login], AuthController.login);

router.post('/token/refresh', [AuthValidator.refreshToken], AuthController.refreshToken);

router.post('/register', [AuthValidator.register], AuthController.register);


module.exports = router;