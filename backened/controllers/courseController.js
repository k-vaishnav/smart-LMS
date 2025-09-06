import Course from "../models/CourseModel.js"
const getCourse = async (req,res) =>{
    try{
        // fetch the courses from the database
        const coures = await Course.find({})
        .populate("category",'name')
        .populate("instructor","name,email");
    }
    catch(error){
        res.status(500).json({message:"Server error!"})
    }
}

const getCourseById = async (req,res) =>{
    try{
        // fetch the course from the database
        const course = await Course.findById(req.params.id)
        .populate("category",'name')
        .populate("instructor","name");
        if(!course) {
            return res.status(404).json({message:"Course not found!"})
        }
        res.status(200).json(course);
    }
    catch(error){
        res.status(500).json({message:"Server error!"})
    }
}

export {getCourse,getCourseById}