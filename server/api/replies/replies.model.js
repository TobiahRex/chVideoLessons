import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
import Comment from '../comments/comment.model';

let replySchema = new mongoose.Schema({
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
  }]
});

replySchema.statics.addReply = (commentId, replyObj, cb) => {
  if (!commentId) return cb({ Error: 'Missing ID(s).' });
  let dbComment1 = {};
  Comment.findById(commentId).exec()
  .then((dbComment) => {
    dbComment1 = dbComment;
    Reply.create(replyObj);
  })
  .then((dbReply) => dbComment1.replies.push(dbReply._id).save())
  .then((savedComment) => cb(null, savedComment))
  .catch((err) => cb(err));
};

replySchema.statics.upVote = (replyId, userId, cb) => {
  if (!userId || !replyId) return cb({ Error: 'Missing ID(s).' });
  Reply.findById(replyId).exec()
  .then((dbReply) => dbReply.upvotes.push(userId).save())
  .then((savedReply) => cb(null, savedReply))
  .catch((err) => cb(err));
};

replySchema.statics.downVote = (replyId, userId, cb) => {
  if (!userId || !replyId) return cb({ Error: 'Missing ID(s)' });
  Reply.findById(replyId).exec()
  .then((dbReply) => dbReply.downvotes.push(userId._id).save())
  .then((savedReply) => cb(null, savedReply))
  .catch((err) => cb(err));
};
const Reply = mongoose.model('Reply', replySchema);
export default Reply;
