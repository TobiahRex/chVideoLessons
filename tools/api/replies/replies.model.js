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
  
};

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
