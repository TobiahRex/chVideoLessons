import express from 'express';
const router = express.Router();
import Chapter from './chapter.model';


router.route('/:id')
.put((req, res) => Chapter.addComments(req.params.id, req.body, res.handle))
.delete((req, res) => Chapter.findByIdAndRemove(req.params.id, res.handle));

router.get('/', (req, res) => Chapter.find({}, res.handle));
router.post('/new/:sectionId', (req, res) => Chapter.createAndAddToSection(req.body, req.params.sectionId, res.handle));

module.exports = router;
