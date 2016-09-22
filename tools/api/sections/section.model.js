import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const sectionSchema = new mongoose.Schema({
  title: { type: String },
  notes: { type: String },
  chapters: [{ type: ObjectId, ref: 'Chapter' }]
});
const Section = mongoose.model('Section', sectionSchema);
export default Section;
