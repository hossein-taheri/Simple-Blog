const express = require("express");
const router = express.Router();
const JWTAuth = require('../middleware/JWTAuth');


const auth = require('./auth')
const home = require('./home')
const post = require('./post')
const comment = require('./comment')
const upload = require('./upload')

router.use('/', home);

router.use('/auth', auth);

router.use(JWTAuth.check);

router.use('/post', post);

router.use('/comment', comment);

router.use('/upload', upload);

module.exports = router;