const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Type.ObjectId;

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

  
};
