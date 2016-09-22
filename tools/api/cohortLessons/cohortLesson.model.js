import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const cohortLessonSchema = new mongoose.Schema({
  lessons: [{ type: ObjectId, ref: 'Lesson' }],
  cohort: { type: ObjectId, ref: 'Cohort' }
});

const CohortLesson = mongoose.model('CohortLesson', cohortLessonSchema);
module.exports = CohortLesson;
