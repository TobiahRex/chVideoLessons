import mongoose from 'mongoose';
import Comment from '../comments/comment.model';
const ObjectId = mongoose.Schema.Types.ObjectId;

const chapterSchema = new mongoose.Schema({
  title: { type: String },
  comments: [{ type: ObjectId, ref: 'User' }],
  video: {
    url: { type: String },
    duration: { type: Number }
  }
});
chapterSchema.postComment = (chapterId, comment, cb) => {
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
chapterSchema.removeComment = (chapterId, comment, cb) => {
  if (!chapterId) return cb({ Error: 'Missing required id to remove Comment.' });
  Chapter.findByIdAndRemove(chapterId, (err, removedChapter) => {
    if (err) return cb({ Error: `Could not find chapter with id - ${chapterId}` });
    return cb(null, { Success: removedChapter });
  });
};
const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;
