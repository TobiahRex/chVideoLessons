const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
import CohortLesson from '../cohortLessons/cohortLesson.model';
import Chapter from '../chapters/chapter.model';
import Section from '../sections/section.model';
import Comment from '../comments/comment.model';
import Replies from '../replies/replies.model';

const lessonSchema = new mongoose.Schema({
  title: { type: String },
  notes: { type: String },
  sections: [{ type: ObjectId, ref: 'Section' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
/*
1) find a cohort lesson that should already exist.
2) create a new lesson
3) pass the new lesson._id into the cohort Lesson and save.
4) for each section in the lesson, create a seciton
& create a chapter.
5) insert the chapter ids into the section.
6) save the section.
7) insert the section id into the lesson.
8) save the lesson.
9) insert the lesson id into the cohortLesson.
10) save the cohortLesson.
*/
// lessonSchema.statics.createNewLesson = (lessonObj, cb) => {
//   console.log('lessonObj: ', lessonObj);
//   if (!lessonObj) return cb({ Error: 'Did not provide lesson Obj.' });
//
//   CohortLesson.findById(lessonObj.cohortLessonID, (err, dbCL) => {
//     if (err) return cb({ Error: `Bad Cohort Lesson ID - ${lessonObj.cohortLessonID}` });
//
//     Lesson.create({ title: lessonObj.title }, (err2, dbLesson) => {
//       if (err2) return cb({ Error: `Bad Lesson Obj - ${err2}` });
//
//       dbCL.lessons.push(dbLesson._id);
//       dbCL.save((err3, savedCohortLesson) => {
//         console.log('savedCohortLesson: ', savedCohortLesson);
//         if (err3) return cb({ Error: `Could not save Lesson to Cohort Lesson. ${err3}` });
//
//         lessonObj.sections.forEach((sectionObj) => {
//           Section.create({ title: sectionObj.title }, (err4, dbSection) => {
//             if (err4) return cb({ Error: `Bad Section Obj - ${sectionObj}` });
//
//             dbLesson.sections.push(dbSection._id);
//             dbLesson.save((err5) => {
//               if (err5) return cb({ Error: `Could not save Section to Lesson. ${err5}` });
//
//               sectionObj.chapters.forEach((chapterObj) => {
//                 Chapter.create(chapterObj, (err6, dbChapter) => {
//                   if (err6) return cb({ Error: `Bad Chapter Obj - ${chapterObj}` });
//
//                   dbSection.chapters.push(dbChapter._id);
//                   dbSection.save((err7) => {
//                     if (err7) return cb({ Error: `Could not save Chapter to Section. ${err5}`});
//                   });
//                 });
//               });
//             });
//           });
//         });
//
//         return cb(null, savedCohortLesson);
//
//       });
//     });
//   });
// };

lessonSchema.statics.addSections = (lessonId, sectionIDs, cb) => {
  // this route is assuming the sections have already been created.
  if (!lessonId) return cb({ error: 'Did not provide lesson ID' });

  Lesson.findById(lessonId).exec()
  .then((dbLesson) => dbLesson.sections.push(sectionIDs).save())
  .then((savedLesson) => cb(null, savedLesson))
  .catch((err) => cb(err));
};

lessonSchema.statics.deepRemove = (lessonId, cb) => {
  if (!lessonId) return cb({ Error: 'Did not provide lesson ID' });

  Lesson.findById(lessonId)
  .deepPopulate('sections section.chapters sections.chapters.comments sections.chapters.comments.replies')
  .exec()
  .then((dbLesson) => {
    let sections = [], chapters, comments, replies;
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
  })
  .catch((err) => cb(err));
};
let Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
