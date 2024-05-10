const express = require("express");
const router = express.Router();
const courseController = require("../controller/CourseController");
const upload = require("../services/upload");
const uploadVideo = require("../services/uploadVideo");

// Define routes for CRUD operations
router.get("/instructor/:iid", courseController.getCoursesByInstructor);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.post("/:id/answer", courseController.answerQuiz);
router.post("/approve/:id", courseController.approve);
router.post(
  "/:id/upload-lecture-notes",
  upload.single("file"),
  courseController.uploadLectureNotes
);
router.get(
  "/:id/download-lecture-notes",
  courseController.downloadLectureNotes
);
router.post(
  "/:id/upload-lecture-videos",
  uploadVideo.single("video"),
  courseController.uploadLectureVideos
);

module.exports = router;
