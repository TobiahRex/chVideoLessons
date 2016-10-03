import express from 'express';
const router = express.Router();
import Reply from './replies.model';

router.route('/:id')
.put((req, res) => Reply.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, res.handle))
.delete((req, res) => Reply.findByIdAndRemove(req.params.id, res.handle));

router.post('/add/:commentId', (req, res) => Reply.addReply(req.params.commentId, req.body, res.handle));
router.post('/:replyId/upvote/:userId', (req, res) => Reply.upVote(req.params.replyId, req.params.userId, res.handle));
router.post('/:replyId/downvote/:userId', (req, res) => Reply.downVote(req.params.replyId, req.params.userId, res.handle));

module.exports = router;
