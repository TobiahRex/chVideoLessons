import mongoose from 'mongoose';
import Comment from '../comments/comment.model';
import User from '../users/user.model';
const ObjectId = mongoose.Schema.Types.ObjectId;

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

replySchema.addReply = (commentId, reply, cb) => {
  if (!commentId) return cb({ Error: 'Did not provide Comment ID for Reply.' });
  Reply.create(reply, (err1, dbReply) => {
    Comment.findById(commentId, (err2, dbComment) => {
      if (err1) return cb({ Error: `Error making Reply: ${err1}` });
      if (err2) return cb({ Error: `Could not find Comment with ID: ${commentId}` });

      dbComment.replies.push(dbReply._id);
      dbComment.save((err3, savedComment) => cb(err3 || null, savedComment));
    });
  });
};
replySchema.upVote = (userId, replyId, cb) => {
  if (!userId || !replyId) return cb({ Error: 'Did not provide User Id for Upvote' });
  User.findById(userId, (err1, dbUser) => {
    Reply.findById(replyId, (err2, dbReply) => {
      if (err1) return cb({ Error: `Could not find that user: ${userId}` });
      if (err2) return cb({ Error: `Could not find that reply: ${replyId}` });

      dbReply.upvotes.push(dbUser._id);
      dbReply.save((err3, savedReply) => cb(err3 || null, savedReply));
    });
  });
};
replySchema.downVote = (userId, replyId, cb) => {
  if (!userId || !replyId) return cb({ Error: 'Did not provide User Id for Downvote' });
  User.findById(userId, (err1, dbUser) => {
    Reply.findById(replyId, (err2, dbReply) => {
      if (err1) return cb({ Error: `Could not find that user: ${userId}` });
      if (err2) return cb({ Error: `Could not find that reply: ${replyId}` });

      dbReply.downvotes.push(dbUser._id);
      dbReply.save((err3, savedReply) => cb(err3 || null, savedReply));
    });
  });
};
const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
