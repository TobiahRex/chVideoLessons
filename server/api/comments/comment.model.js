import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Chapter = require('../chapters/chapter.model');
const User = require('../users/user.model');

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
commentSchema.postComment = (chapterId, comment, cb) => {
  if (!chapterId || !comment) return cb({ Error: 'Missing required info to add Comment.' });
  Chapter.findById(chapterId, (err1, dbChapter) => {
    Comment.create(comment, (err2, dbComment) => {
      if (err1) return cb({ Error: `Error finding Chapter: ${err1}` });
      if (err2) return cb({ Error: `Could not create Comment - ${err2}` });
      dbChapter.comments.push(dbComment._id);
      dbChapter.save((err3, savedChapter) => cb(err3 || null, savedChapter));
    });
  });
};

commentSchema.upVote = (commentId, userId, cb) => {
  if (!userId || !commentId) return cb({ Error: 'Did not provide User Id for Upvote' });
  Comment.findById(commentId, (err2, dbComment) => {
    if (err2) return cb({ Error: `Could not find that Comment: ${commentId}` });

    dbComment.upvotes.push(userId._id);
    dbComment.save((err3, savedComment) => cb(err3 || null, savedComment));
  });
};

commentSchema.downVote = (commentId, userId, cb) => {
  if (!userId || !commentId) return cb({ Error: 'Did not provide User Id for Downvote' });
  Comment.findById(commentId, (err2, dbComment) => {
    if (err2) return cb({ Error: `Could not find that reply: ${commentId}` });

    dbComment.downvotes.push(userId._id);
    dbComment.save((err3, savedComment) => cb(err3 || null, savedComment));
  });
};
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
