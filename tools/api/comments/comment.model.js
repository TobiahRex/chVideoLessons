const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('../users/user.model');
const Lesson = require('../lessons/lessons.model');

let commentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  body: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  upvotes: [{
    type: ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: ObjectId,
    ref: 'User'
  }],
  replies: [{
    type: ObjectId,
    ref: 'Reply'
  }]
});
commentSchema.addComment = (idsObj, chapterId, comment, cb) => {
  if (!idsObj.lesson || !idsObj.section || !idsObj.chapter || !comment) return cb({ Error: 'Missing required info to add Comment.' });
  Comment.create(reply, (err1, dbComment) => {
    Comment.findById(commentId, (err2, dbComment) => {
      if (err1) return cb({ Error: `Error making Reply: ${err1}` });
      if (err2) return cb({ Error: `Could not find Comment with ID: ${commentId}` });

      dbComment.replies.push(dbComment._id);
      dbComment.save((err3, savedComment) => cb(err3 || null, savedComment));
    });
  });
};
commentSchema.upVote = (userId, replyId, cb) => {
  if (!userId || !replyId) return cb({ Error: 'Did not provide User Id for Upvote' });
  User.findById(userId, (err1, dbUser) => {
    Reply.findById(replyId, (err2, dbComment) => {
      if (err1) return cb({ Error: `Could not find that user: ${userId}` });
      if (err2) return cb({ Error: `Could not find that reply: ${replyId}` });

      dbComment.upvotes.push(dbUser._id);
      dbComment.save((err3, savedReply) => cb(err3 || null, savedReply));
    });
  });
};
commentSchema.downVote = (userId, replyId, cb) => {
  if (!userId || !replyId) return cb({ Error: 'Did not provide User Id for Downvote' });
  User.findById(userId, (err1, dbUser) => {
    Reply.findById(replyId, (err2, dbComment) => {
      if (err1) return cb({ Error: `Could not find that user: ${userId}` });
      if (err2) return cb({ Error: `Could not find that reply: ${replyId}` });

      dbComment.downvotes.push(dbUser._id);
      dbComment.save((err3, savedReply) => cb(err3 || null, savedReply));
    });
  });
};
const Comment = mongoose.model('Reply', commentSchema);
module.exports = Comment;
