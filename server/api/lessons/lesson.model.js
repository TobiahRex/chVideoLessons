const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
import CohortLesson from '../cohortLessons/cohortLesson.model';
import Chapter from '../chapters/chapter.model';
import Section from '../sections/section.model';
import Comment from '../comments/comment.model';
import Replies from '../replies/replies.model';
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const lessonSchema = new mongoose.Schema({
  title: { type: String },
  notes: { type: String },
  sections: [{ type: ObjectId, ref: 'Section' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
lessonSchema.plugin(deepPopulate);

/*
 This route takes an array of section Mongo ID's.
 The ID's should be added to an array in the FE,
*/
lessonSchema.statics.addSections = (lessonId, sectionIDs, cb) => {
  if (!lessonId) return cb({ error: 'Did not provide lesson ID' });

  Lesson.findById(lessonId).exec()
  .then((dbLesson) => dbLesson.sections.push(sectionIDs).save())
  .then((savedLesson) => cb(null, savedLesson))
  .catch((err) => cb(err));
};
/*
  This route dynamically removes all ID's found inside of a Lesson.
  ID's found could be Sections, Chapters, Comments, &/or Replies.
*/
lessonSchema.statics.deepRemove = (lessonId, cb) => {
  if (!lessonId) return cb({ Error: 'Did not provide lesson ID' });

  Lesson.findById(lessonId)
  .deepPopulate('sections section.chapters sections.chapters.comments sections.chapters.comments.replies')
  .exec()
  .then((dbLesson) => {
    let sections = [];
    let chapters = [];
    let comments = [];
    let replies = [];
    sections = [...dbLesson.sections];
    dbLesson.sections.forEach((section) => {
      chapters = [...section.chapters];
      section.chapters.forEach((chapter) => {
        comments = [...chapter.comments];
        chapter.comments.forEach((comment) => {
          replies = [...comment.replies];
        });
      });
    });

    sections.forEach((section) => Section.findByIdAndRemove(section._id));
    chapters.forEach((chapter) => Chapter.findByIdAndRemove(chapter._id));
    comments.forEach((comment) => Comment.findByIdAndRemove(comment._id));
    replies.forEach((reply) => Replies.findByIdAndRemove(reply._id));

    Lesson.findByIdAndRemove(dbLesson._id).exec();
  })
  .then(() => cb(null, { success: 'Lesson was successfully removed.' }))
  .catch((err) => cb(err));
};
let Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
