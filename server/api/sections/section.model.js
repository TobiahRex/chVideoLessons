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
    let chapterIDs = [...dbSection.chapters], commentIDs, replyIDs;
    dbSection.chapters.forEach((chapter) => {
      commentIDs = [...chapter.comments];
      chapter.comments.forEach((comment) =>
      replyIDs = [...comment.replies]);
    });

    chapterIDs.forEach((chapter) =>
    Chapter.findByIdAndRemove(chapter._id, (err) => err ? cb(err) : null));

    commentIDs.forEach((comment) =>
    Comment.findByIdAndRemove(comment._id, (err) => err ? cb(err) : null));

    replyIDs.forEach((reply) =>
    Replies.findByIdAndRemove(reply._id, (err) => err ? cb(err) : null));

    return cb(null, dbSection);
  })
  .catch((err) => cb(err));
};
// this route needs chapter _id's from mongo.
sectionSchema.statics.addChapters = (sectionId, chapterIDs, cb) => {
  if (!sectionId) return cb({ Error: 'Did not provide seciton Id' });

  Section.findById(sectionId).exec()
  .then((dbSection) => dbSection.chapters.push(chapterIDs).save())
  .then((savedSection) => cb(null, savedSection))
  .catch((err) => cb(err));
};
const Section = mongoose.model('Section', sectionSchema);
export default Section;
