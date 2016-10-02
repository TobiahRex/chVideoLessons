import express from 'express';
const router = express.Router();

router.use('/login', require('./login/login'));
router.use('/users', require('./users/users'));
router.use('/cl', require('./cohortLessons/cohortLessons'));

router.use('/lessons', require('./lessons/lessons'));
router.use('/sections', require('./sections/sections'));
router.use('/chapters', require('./chapters/chapters'));
router.use('./comments', require('./comments/comments'));
router.use('./replies', require('./replies/replies'));

module.exports = router;
