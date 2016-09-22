import express from 'express';
const router = express.Router();

router.route('/:id')
.get((req, res) => CohortLesson.findById(req.params.id, res.handle))
.put((req, res) => CohortLesson.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, res.handle));

module.exports = router;
