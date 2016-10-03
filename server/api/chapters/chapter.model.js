import mongoose from 'mongoose';
import Section from '../sections/section.model';
const ObjectId = mongoose.Schema.Types.ObjectId;

const chapterSchema = new mongoose.Schema({
  title: { type: String },
  comments: [{ type: ObjectId, ref: 'Comment' }],
  video: {
    url: { type: String },
    duration: { type: Number }
  }
});
chapterSchema.statics.createAndAddToSection = (chapterObj, sectionId, cb) => {
  if (!chapterObj || !sectionId) return cb({ Error: 'Missing input(s) @ create Chapter' });
  let dbSection1 = {};
  Section.findById(sectionId).exec()
  .then((dbSection) => {
    dbSection1 = dbSection;
    Chapter.create(chapterObj);
  })
  .then((dbChapter) => dbSection1.chapters.push(dbChapter).save())
  .then((savedSection) => cb(null, savedSection))
  .catch((err) => cb(err));
};

/*
  This route adds an array of chapter mongo ID's to a chapter.
  The chapter ID's should be added to an array in the FE.
*/
chapterSchema.statics.addComments = (chapterId, commentIDs, cb) => {
  if (!chapterId) return cb({ Error: 'Did not provide chapter Id.' });

  Chapter.findById(chapterId).exec()
  .then((dbChapter) => dbChapter.comments.push(commentIDs).save())
  .then((savedChapter) => cb(null, savedChapter))
  .catch((err) => cb(err));
};

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;
