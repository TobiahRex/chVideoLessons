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
  
  create a new lesson.
  for each section, create a chapter.
  save the section id and the chapter id.

  insert the chapter ids into the section.
  insert the section id into the lesson.

  save the section.
  save the lesson.


  inside of creating each Section create a Chapter.
  save the ids for each section and
  create a Section for each section in the obj.
  create a Chapter for each chapter in the obj.
  create a lesson for the entire object.

  insert the Chapter ID's their respsective
*/
