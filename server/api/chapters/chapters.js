import express from 'express';
const router = express.Router();
import Chapter from './chapter.model';

router.route('/')
.get((req, res) => Chapter.find({}, res.handle))
.post((req, res) => Chapter.create({ title: req.body.title, vide: { url: req.body.url, duration: req.body.duration } }));


router.route('/:id')
.put((req, res) => Chapter.addComments(req.params.id, req.body, res.handle))
.delete((req, res) => Chapter.findByIdAndRemove(req.params.id, res.handle));

module.exports = router;
