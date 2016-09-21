import express from 'express';
import Chapter from './chapter.model';
const router = express.Router();

router.post('/', (req, res) => Chapter.create(req.body, res.handle));

router.route('/:id')
.post((req, res) => Chapter.postComment(req.params.id, req.body, res.handle))
.delete((req, res) => Chapter.removeComment(req.params.id, res.handle));

module.exports = router;
