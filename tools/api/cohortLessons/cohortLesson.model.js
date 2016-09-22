import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const cohortLesonSchema = new mongoose.Schema({
  
});

const CohortLesson = mongoose.model('CohortLesson', cohortLessonSchema);
export default CohortLesson;
