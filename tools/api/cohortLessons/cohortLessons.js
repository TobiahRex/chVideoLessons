import express from 'express';
import CohortLesson from './cohortLesson.model';
const router = express.Router();

/*
  TODO: Remove this route in Production.
*/
router.route('/dev')
.delete((req, res) => CohortLesson.remove({}, res.handle))
.post((req, res) => CohortLesson.create(req.body, res.handle))
.get((req, res) => CohortLesson.find({}, res.handle));

router.route('/:id')
.get((req, res) => CohortLesson.findById(req.params.id).populate('Lesson').exec(res.handle))
.put((req, res) => CohortLesson.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
  .populate('Lesson')
  .exec(res.handle));

export default router;
