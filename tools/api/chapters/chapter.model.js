import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const chapterSchema = new mongoose.Schema({
  title: { type: String },
  comments: [{ type: ObjectId, ref: 'User' }],
  video: {
    url: { type: String },
    duration: { type: Number }
  }
});


const Chapter = mongoose.model('Chapter', chapterSchema);
