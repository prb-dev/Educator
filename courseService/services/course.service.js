const Course = require("../model/Course");

class CourseService {
  async getAllCourses() {
    const courses = await Course.find();
    return courses;
  }

  async getCourseById(cid) {
    const course = await Course.findById(cid);
    return course;
  }

  async createCourse(data) {
    const course = new Course(data);
    const newCourse = await course.save();
    return newCourse;
  }

  async updateCourse(cid, data) {
    await Course.findByIdAndUpdate(cid, data);
  }

  async deleteCourse(cid) {
    await Course.findByIdAndDelete(cid);
  }

  async answerQuiz(cid, data) {
    const course = await Course.findById(cid);

    // Retrieve questions and answers from request body
    const { answers } = data;

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

    return score;
  }

  async uploadLectureNotes(cid, file) {
    const course = await Course.findById(cid);

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "raw",
      folder: "lecture_notes", // You can customize the folder name
      public_id: `${cid}_lecture_notes`, // Public ID of the file
    });

    // Save lecture notes URL to the course
    course.lectureNotesUrl = result.secure_url;
    await course.save();

    return result;
  }

  async getCourses(cids) {
    const courses = await Course.find({ _id: { $in: cids } });
    return courses;
  }

  async getCoursesByInstructor(iid) {
    const courses = await Course.find({
      instructor: iid,
    });
    return courses;
  }

  async saveScheduleId(cid, sid) {
    try {
      await Course.findByIdAndUpdate(cid, {
        $set: {
          schedule: sid,
        },
      });

      return "success";
    } catch (error) {
      console.log(error);
    }
  }

  async deleteScheduleId(cid) {
    try {
      await Course.findByIdAndUpdate(cid, {
        $set: {
          schedule: null,
        },
      });

      return "success";
    } catch (error) {
      console.log(error);
    }
  }

  async eventHandler(payload) {
    try {
      switch (payload.event) {
        case "GET_COURSES":
          return this.getCourses(payload.cids);
        case "GET_COURSE":
          return this.getCourseById(payload.cid);
        case "GET_COURSES_BY_INSTRUCTOR":
          return this.getCoursesByInstructor(payload.iid);
        case "SAVE_SCHEDULE":
          return this.saveScheduleId(payload.cid, payload.sid);
        case "DELETE_SCHEDULE":
          return this.deleteScheduleId(payload.cid);
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CourseService;
