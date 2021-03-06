import Lesson from './lesson.model';
import express from 'express';
const router = express.Router();
import CohortLesson from '../cohortLessons/cohortLesson.model';

// TODO: Delete this remove all route before production!
router.route('/dev').delete((req, res) => Lesson.remove({}, res.handle));


router.route('/:id')
.get((req, res) => Lesson.findById(req.params.id, res.handle))
.delete((req, res) => Lesson.deepRemove(req.params.id, res.handle))
.put((req, res) => Lesson.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, res.handle));

router.route('/')
.get((req, res)=> Lesson.find({}).populate('Section').exec(res.handle))
.post((req, res) => Lesson.create(req.body, res.handle));

module.exports = router;
