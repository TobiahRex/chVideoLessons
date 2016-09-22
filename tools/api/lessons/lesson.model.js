const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Type.ObjectId;
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
  let chapterIDs = [];
  lessonObj.chapters.forEach((chapter) => {
    Chapter.create(chapter, (err1, dbChapter) => {
      chapterIDs.push(dbChapter._id);
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
