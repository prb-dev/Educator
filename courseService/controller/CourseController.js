const Course = require("../model/Course");

// Controller functions for CRUD operations
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCourse = async (req, res) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Course updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.answerQuiz = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    // Retrieve questions and answers from request body
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid answers format" });
    }

    let score = 0;

    // Loop through each answer and compare with correct answer
    for (let i = 0; i < answers.length; i++) {
      const questionIndex = answers[i].questionIndex;
      const selectedAnswerIndex = answers[i].selectedAnswerIndex;

      if (
        course.questions[questionIndex] &&
        course.questions[questionIndex].correctAnswerIndex ===
          selectedAnswerIndex
      ) {
        score++;
      }
    }

    res.json({ score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadLectureNotes = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      resource_type: "raw",
      folder: "lecture_notes", // You can customize the folder name
      public_id: `${courseId}_lecture_notes`, // Public ID of the file
    });

    // Save lecture notes URL to the course
    course.lectureNotesUrl = result.secure_url;
    await course.save();

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