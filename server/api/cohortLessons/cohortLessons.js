import express from 'express';
const router = express.Router();
import CohortLesson from './cohortLesson.model';

// TODO: Remove these /dev routes in Production.

router.route('/dev')
.delete((req, res) => CohortLesson.remove({}, res.handle))
.post((req, res) => CohortLesson.create(req.body, res.handle))
.get((req, res) => CohortLesson.find({}, res.handle));

router.route('/:id')
.get((req, res) => CohortLesson.findById(req.params.id).populate('Lesson').exec(res.handle))
.put((req, res) => CohortLesson.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }));

module.exports = router;
