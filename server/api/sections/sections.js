import express from 'express';
const router = express.Router();
import Section from './section.model';

router.post('/', (req, res) => Section.create(req.body, res.handle));

router.route('/:id')
.get((req, res) => Section.findById(req.params.id, res.handle))
.put((req, res) => Section.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, res.handle))
.delete((req, res) => Section.deepRemove(req.params.id, res.handle));

module.exports = router;
