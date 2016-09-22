import express from 'express';
const router = express.Router();
const Lesson = require('./lesson.model');
const CohortLesson = require('../cohortLessons/cohortLesson.model');

router.route('/dev')
/*
TODO: Delete this remove all route before production!
*/
.delete((req, res) => Lesson.remove({}, res.handle))
.get((req, res) => Lesson.find({}, res.handle));

router.route('/')
.get((req, res) => Lesson.find({}).populate('Section').exec(res.handle))
.post((req, res) => Lesson.createNewLesson(req.body, res.handle));

router.route('/:id')
.get((req, res) => Lesson.findById(req.params.id, res.handle))
.delete((req, res) => Lesson.findByIdAndRemove(req.params.id, res.handle))
.put((req, res) => Lesson.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, res.handle));

router.route('/cohort-lessons/:id')
.get((req, res) => CohortLesson.findById(req.params.id, res.handle))
.put((req, res) => CohortLesson.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, res.handle));

module.exports = router;
