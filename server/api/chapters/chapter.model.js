import mongoose from 'mongoose';
const Comment = require('../comments/comment.model');
const ObjectId = mongoose.Schema.Types.ObjectId;

const chapterSchema = new mongoose.Schema({
  title: { type: String },
  comments: [{ type: ObjectId, ref: 'Comment' }],
  video: {
    url: { type: String },
    duration: { type: Number }
  }
});
// this route assumed that you have already created each Comment.
chapterSchema.statics.addComments = (chapterId, commentIDs, cb) => {
  if (!chapterId) return cb({ Error: 'Did not provide chapter Id.' });

  Chapter.findById(chapterId).exec()
  .then((dbChapter) => dbChapter.comments.push(commentIDs).save())
  .then((savedChapter) => cb(null, savedChapter))
  .catch((err) => cb(err));
};

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;
