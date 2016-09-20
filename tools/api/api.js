const express = require('express');
const router = express.Router();

router.use('/login', require('./login/login'));
router.use('/users', require('./users/users'));
router.use('/lessons', require('./lessons/lessons'));
module.exports = router;
