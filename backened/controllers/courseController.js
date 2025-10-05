import Course from "../models/CourseModel.js";
const getCourse = async (req, res) => {
  const { keyword, category } = req.query;
  // title filter
  const titleFFilter = keyword
    ? { title: { $regex: keyword, $options: "i" } }
    : {};

  // category Filter
  const categoryFilter = category ? { category } : {};

  try {
    // fetch the courses from the database
    const coures = await Course.find({ ...titleFFilter })
      .populate({
        path: "category",
        select: "name",
        match: category ? { name: category } : {},
      })
      .populate("instructor", "name email");
    res.status(200).json(coures);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

const getCourseById = async (req, res) => {
  try {
    // fetch the course from the database
    const course = await Course.findById(req.params.id)
      .populate("category", "name")
      .populate("instructor", "name");
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

// enroll user into course

const enrollStudentInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // validate if use already purchased
    if (course.enrolledStudents.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You already enrolled in this course!" });
    }
    // update/insert user id into enrolled students
    course.enrolledStudents.push(req.user.id);
    // update database
    await course.save();

    res.status(200).json({ message: "Enrolled successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

// fetch enrolled user courses
const myCourses = async (req,res) =>{
// get my courses
try{
    const courses = await Course.find({ enrolledStudents: req.user.id }).then((courses) => {
        return res.status(200).json(courses);
    });
}
catch(error){
    return res.status(500).json({ message: "Server error!" });
}
}

export { getCourse, getCourseById, enrollStudentInCourse, myCourses };
