import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
import Chapter from '../chapters/chapter.model';
import Comment from '../comments/comment.model';
import Replies from '../replies/replies.model';
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const sectionSchema = new mongoose.Schema({
  title: { type: String },
  chapters: [{ type: ObjectId, ref: 'Chapter' }]
});
sectionSchema.plugin(deepPopulate);

sectionSchema.statics.deepRemove = (id, cb) => {
  Section.findById(id)
  .deepPopulate('chapters chapters.comments chapters.comments.replies')
  .exec()
  .then((dbSection) => {
    let chapterIDs = [...dbSection.chapters];
    let commentIDs = [];
    let replyIDs = [];
    dbSection.chapters.forEach((chapter) => {
      commentIDs = [...chapter.comments];
      chapter.comments.forEach((comment) =>
      replyIDs = [...comment.replies]);
    });

    chapterIDs.forEach((chapter) => Chapter.findByIdAndRemove(chapter._id));
    commentIDs.forEach((comment) => Comment.findByIdAndRemove(comment._id));
    replyIDs.forEach((reply) => Replies.findByIdAndRemove(reply._id));

    Section.findByIdAndRemove(dbSection._id).exec();
  })
  .then(() => cb(null, { success: 'Section successfully removed.' }))
  .catch((err) => cb(err));
};

/*
  This route takes an array of Chapter Mongo Id's.
  The Id's should be added to an array in the FE.
*/
sectionSchema.statics.addChapters = (sectionId, chapterIDs, cb) => {
  if (!sectionId || !chapterIDs) return cb({ Error: 'Missing ID(s) @ addChapters' });

  Section.findById(sectionId).exec()
  .then((dbSection) => dbSection.chapters.push(chapterIDs).save())
  .then((savedSection) => cb(null, savedSection))
  .catch((err) => cb(err));
};

const Section = mongoose.model('Section', sectionSchema);
export default Section;
