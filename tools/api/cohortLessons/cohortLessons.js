import express from 'express';
import CohortLesson from './cohortLesson.model';
const router = express.Router();

router.route('/:id')
.get((req, res) => CohortLesson.findById(req.params.id).populate('Lesson').exec(res.handle))
.put((req, res) => CohortLesson.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
  .populate('Lesson')
  .exec(res.handle));

module.exports = router;
