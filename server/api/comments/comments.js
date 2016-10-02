import express from 'express';
const router = express.Router();
import Comment from './comment.model';

router.post('/add/:commentId', (req, res) => Comment.addComment(req.params.commentId, req.body, res.handle));
router.post('/:commentId/upvote/:userId', (req, res) => Comment.upVote(req.params.commentId, req.params.userId, res.handle));
router.post('/:commentId/downvote/:userId', (req, res) => Comment.downVote(req.params.commentId, req.params.userId, res.handle));

module.exports = router;
