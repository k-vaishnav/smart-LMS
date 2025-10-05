import mongoose from "mongoose";
const { Schema } = mongoose;

// lesson scehma
const lessonSchema = new Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
})
// module Schema
const moduleSchema = new Schema({
    title: { type: String, required: true },
    lessons: [lessonSchema],
})


const courseSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  enrolledStudents :[{
    type:Schema.Types.ObjectId,
    ref:"User",
  }],
  modules: [moduleSchema],
}, {timestamps: true});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
