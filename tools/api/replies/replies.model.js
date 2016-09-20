const mongoose = require('mongoose');
const Comment = require('../comments/commend.model');
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
    if (err1) return cb({ Error: `Error making Reply: ${err1}` });
    Comment.findById(commentId, (err2, dbComment) => {
      if (err2) return cb({ Error: `Could not find Comment with ID: ${commentId}` });

      dbComment.replies.push(dbReply.id);
      dbComment.save((err3, savedComment) => cb(err3 || null, savedComment));
    });
  });
};

replySchema.upvote = (userId, replyId, cb) => {
  if (!userId || !replyId) return cb({ Error: 'Did not provide User Id for Upvote' });

};

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
