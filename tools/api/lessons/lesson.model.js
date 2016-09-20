const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Type.ObjectId;

const lessonSchema = new mongoose.Schema({
  title: {
    type: String
  },
  sections: [{
    title: { type: String },
    notes: { type: String },
    chapters: [{
      title: { type: String },
      comments: { type: ObjectId, ref: 'Comment' },
      video: {
        url: { type: String },
        duration: { type: Number }
      }
    }]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
