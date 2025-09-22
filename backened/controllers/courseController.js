import Course from "../models/CourseModel.js"
const getCourse = async (req,res) =>{
    const {keyword,category} = req.query;
    console.log(keyword,category);
    // title filter
    const titleFFilter = keyword ? {title:{$regex: keyword,$options:"i"}}:{};

    // category Filter
    const categoryFilter = category ?{category} : {};
    
    try{
        // fetch the courses from the database
        const coures = await Course.find({...titleFFilter})
        .populate({
            path:"category",
            select:"name",
            match:category?{name:category}:{},
        })
        .populate("instructor",'name email');
        res.status(200).json(coures);
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