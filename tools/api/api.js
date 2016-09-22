const express = require('express');
const router = express.Router();

router.use('/login', require('./login/login'));
router.use('/users', require('./users/users'));
router.use('/lessons', require('./lessons/lessons'));
router.use('/cl', require('./cohortLessons/cohortLessons'));
module.exports = router;
