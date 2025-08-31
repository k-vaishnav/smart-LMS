import mongoose from "mongoose";
const {Schema} = mongoose
const courseSchema = new Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true,default:0},
    description:{type:String,required:true},
    instructor:{type:Schema.Types.ObjectId,ref:"User",required:true},
    category:{type:Schema.Types.ObjectId,ref:"Category",required:true},
})

const Course = mongoose.model('User',courseSchema)

export default Course;