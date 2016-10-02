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
commentSchema.statics.postComment = (chapterId, comment, cb) => {
  if (!chapterId || !comment) return cb({ Error: 'Missing chapterID.' });
  let dbChapter1 = {};
  Chapter.findById(chapterId).exec()
  .then((dbChapter) => {
    dbChapter1 = dbChapter;
    Comment.create(comment);
  })
  .then((dbComment) => dbChapter1.comments.push(dbComment._id).save())
  .then((savedChapter) => cb(null, savedChapter))
  .catch((err) => cb(err));
};

commentSchema.statics.upVote = (commentId, userId, cb) => {
  if (!userId || !commentId) return cb({ Error: 'Did not provide User Id for Upvote' });
  Comment.findById(commentId, (err2, dbComment) => {
    if (err2) return cb({ Error: `Could not find that Comment: ${commentId}` });

    dbComment.upvotes.push(userId._id);
    dbComment.save((err3, savedComment) => cb(err3 || null, savedComment));
  });
};

commentSchema.statics.downVote = (commentId, userId, cb) => {
  if (!userId || !commentId) return cb({ Error: 'Did not provide User Id for Downvote' });
  Comment.findById(commentId, (err2, dbComment) => {
    if (err2) return cb({ Error: `Could not find that reply: ${commentId}` });

    dbComment.downvotes.push(userId._id);
    dbComment.save((err3, savedComment) => cb(err3 || null, savedComment));
  });
};
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
