import Course from "../models/CourseModel.js";
import Category from "../models/CategoryModel.js";
import mongoose, { isValidObjectId } from "mongoose";

const getCourse = async (req, res) => {
  const { keyword, category, minPrice, maxPrice } = req.query;
  const filter = {};
  // title filter
  if (keyword) {
    filter.$or = [{title:{ $regex: keyword, $options: "i" }},{description:{ $regex: keyword, $options: "i" }}];
  }
  // category Filter
  if (category) {
    const categoryDoc = await Category.findOne({ name: category });
    if (categoryDoc) {
      filter.category = categoryDoc._id;
    }
  }
  //  price filter
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }
  }

  try {
    // fetch the courses from the database
    const courses = await Course.find({ ...filter })
      .populate({
        path: "category",
        // match:category?{name:category}:{},
        select: "name"
      })
      .populate("instructor", "name email");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

const getCourseById = async (req, res) => {
  const baseURL = req.protocol + "://" + req.get("host") + "/";
  try {
    // fetch the course from the database
    const course = await Course.findById(req.params.id)
      .populate("category", "name")
      .populate("instructor", "name");
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    course.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        l.videoUrl = baseURL + l.videoUrl;
      });
    });
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
const myCourses = async (req, res) => {
  // get my courses
  try {
    const courses = await Course.find({ enrolledStudents: req.user.id });
    res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: "Server error!" });
  }
};

const postCourse = async (req, res) => {
  let { title, price, description, instructor, category, modules } = req.body;
  modules = JSON.parse(modules);
  req.files.forEach((file) => {
    const [md, mi, le, li] = file.fieldname.split("_");
    modules[mi].lessons[li].videoUrl = file.path;
  });
  const newCourse = {
    title,
    price,
    description,
    instructor: new mongoose.Types.ObjectId(instructor),
    category: new mongoose.Types.ObjectId(category),
    modules,
  };
  try {
    const course = new Course(newCourse);
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        lesson.videoUrl = lesson.videoUrl.replace(/\\/g, "/");
      });
    });
    await course.save();
    return res
      .status(200)
      .json({ message: "Course created successfully!", course });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error in creating course!" });
  }
};

const updateCourse = async (req, res) => {
  let courseId = req.params.courseId;
  const files = req.files;
  try {
    courseId = new mongoose.Types.ObjectId(courseId);
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    const filemap = {};
    files.forEach((file) => {
      const [md, mi, le, li] = file.fieldname.split("_");
      if (!filemap[mi]) filemap[mi] = {};
      filemap[mi][li] = file.path.replace(/\\/g, "/");
    });
    course.modules.forEach((module) => {
      const moduleId = module._id.toString();
      if (!filemap[moduleId]) return;
      module.lessons.forEach((lesson) => {
        const lessonId = lesson._id.toString();
        if (filemap[moduleId][lessonId]) {
          lesson.videoUrl = filemap[moduleId][lessonId];
        }
      });
    });
    await course.save();
    return res
      .status(200)
      .json({ message: "Course updated successfully!", course });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error!" });
  }
};

export {
  getCourse,
  getCourseById,
  enrollStudentInCourse,
  myCourses,
  postCourse,
  updateCourse,
};
