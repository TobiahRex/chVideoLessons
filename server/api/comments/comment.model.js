import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
import Chapter from '../chapters/chapter.model';

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
  if (!userId || !commentId) return cb({ Error: 'Missing ID(s) @ upVote' });

  Comment.findById(commentId).exec()
  .then((dbComment) => dbComment.upvotes.push(userId._id).save())
  .then((savedComment) => cb(null, savedComment))
  .catch((err) => cb(err));
};

commentSchema.statics.downVote = (commentId, userId, cb) => {
  if (!userId || !commentId) return cb({ Error: 'Missing ID(s) @ downVote' });
  Comment.findById(commentId).exec()
  .then((dbComment) => dbComment.downvotes.push(userId._id).save())
  .then((savedComment) => cb(null, savedComment))
  .catch((err) => cb(err));
};

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
