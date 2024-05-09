const Course = require("../model/Course");

const CourseService = require("../services/course.service.js");

const service = new CourseService();

// Controller functions for CRUD operations
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await service.getAllCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 



exports.getCourseById = async (req, res) => {
  try {
    const course = await service.getCourseById(req.params.id);
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await service.createCourse(req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    await service.updateCourse(req.params.id, req.body);
    res.json({ message: "Course updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await service.deleteCourse(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.answerQuiz = async (req, res) => {
  try {
    const score = await service.answerQuiz(req.params.id, req.body);

    res.json({ score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadLectureNotes = async (req, res) => {
  try {
    const result = await service.uploadLectureNotes(
      req.params.id,
      req.file.buffer
    );

    res.json({ lectureNotesUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.downloadLectureNotes = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    // Check if lecture notes URL is available
    if (!course.lectureNotesUrl) {
      return res.status(404).json({ message: "Lecture notes not found" });
    }

    // Redirect to Cloudinary URL for downloading the file
    res.redirect(course.lectureNotesUrl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadLectureVideos = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    // Upload video file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      resource_type: "video",
      folder: "lecture_videos", // You can customize the folder name
      public_id: `${courseId}_lecture_videos`, // Public ID of the video file
    });

    // Save lecture videos URL to the course
    course.lectureVideosUrl = result.secure_url;
    await course.save();

    res.json({ lectureVideosUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCoursesByInstructor = async (req, res) => {
  try {
    const courses = await service.getCoursesByInstructor(req.params.iid);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
