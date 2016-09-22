const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Type.ObjectId;
import CohortLesson from '../cohortLessons/cohortLesson.model';
import Chapter from '../chapters/chapter.model';
import Section from '../sections/section.model';


const lessonSchema = new mongoose.Schema({
  title: { type: String },
  sections: [{ type: ObjectId, ref: 'Section' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

lessonSchema.createNewLesson = (lessonObj, cb) => {
  if (!lessonObj) return cb({ Error: 'Did not provide lesson Obj.' });
  CohortLesson.create(lessonObj.cohortLesson, (err1, dbCL) => {
    if (err1) return cb({ Error: `Bad Cohort Lesson Obj - ${lessonObj.cohortLesson}` });
    Lesson.create(lessonObj.lesson, (err2, dbLesson) => {
      
      lessonObj.sections.forEach((sectionObj) => {
        Section.create(sectionObj, (err3, dbSection) => {

        });
      });

    });
  });
};

/*
  create a new cohortLesson.

  create a new lesson
  save the id.

  for each section in the lesson, create a chapter.
  save the section id
  save the chapter id.

  insert the chapter ids into the section.
  insert the section id into the lesson.
  insert the lesson id into the cohortLesson.

  save the section.
  save the lesson.
  save the cohortLesson.
*/
const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
