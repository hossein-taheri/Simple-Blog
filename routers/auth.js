const express = require("express");
const AuthController = require("../controller/AuthController");
const router = express.Router();


router.post('/login', [], AuthController.login);

router.post('/refresh/token', [], AuthController.refreshToken);

router.post('/register', [], AuthController.register);

router.post('/register/verify', [], AuthController.verifyRegister);


module.exports = router;