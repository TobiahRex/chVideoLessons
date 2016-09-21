const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('../users/user.model');
const Chapter = require('../chapters/chapter');

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
commentSchema.addComment = (chapterId, comment, cb) => {
  if (!chapterId || !comment) return cb({ Error: 'Missing required info to add Comment.' });
  Chapter.findById(chapterId, (err1, dbChapter) => {
    if (err1) return cb({ Error: `Error finding Lesson: ${err1}` });
    Comment.create(comment, (err2, dbComment) => {
      if (err2) return cb({ Error: `Could not create comment - ${err2}` });
      dbChapter.comments.push(dbComment._id);
      dbChapter.save((err3, savedChapter) => cb(err3 || null, savedChapter));
    });
  });
};
commentSchema.upVote = (userId, commentId, cb) => {
  if (!userId || !commentId) return cb({ Error: 'Did not provide User Id for Upvote' });
  User.findById(userId, (err1, dbUser) => {
    Comment.findById(commentId, (err2, dbComment) => {
      if (err1) return cb({ Error: `Could not find that User: ${userId}` });
      if (err2) return cb({ Error: `Could not find that Comment: ${commentId}` });

      dbComment.upvotes.push(dbUser._id);
      dbComment.save((err3, savedComment) => cb(err3 || null, savedComment));
    });
  });
};
commentSchema.downVote = (userId, commentId, cb) => {
  if (!userId || !commentId) return cb({ Error: 'Did not provide User Id for Downvote' });
  User.findById(userId, (err1, dbUser) => {
    Comment.findById(commentId, (err2, dbComment) => {
      if (err1) return cb({ Error: `Could not find that user: ${userId}` });
      if (err2) return cb({ Error: `Could not find that reply: ${commentId}` });

      dbComment.downvotes.push(dbUser._id);
      dbComment.save((err3, savedComment) => cb(err3 || null, savedComment));
    });
  });
};
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
