const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswerIndex: {
    type: Number,
    required: true,
  },
});

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  lecturer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lectureNotesUrl: {
    type: String,
  },
  lectureVideosUrl: {
    type: String,
  },
  questions: [questionSchema], // Array of questions
});

module.exports = mongoose.model("Course", courseSchema);
