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
  .exec((err, dbSection) => {
    // dbSection.chapters[]
    // dbSection.chapters[0].comments
    if (err) cb({ Error: `Could not find Section - ${id}` });
    let chapterIDs = [...dbSection.chapters], commentIDs, replyIDs;
    dbSection.chapters.forEach((chapter) => {
      commentIDs = [...chapter.comments];
      chapter.comments.forEach((comment) => {
        replyIDs = [...comment.replies];
      });
    });
    
    return cb(null, dbSection);
  });
};
const Section = mongoose.model('Section', sectionSchema);
export default Section;
