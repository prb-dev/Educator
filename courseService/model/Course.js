const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
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
  image: {
    type: String,
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
  },
  steps: {
    lectureCount: {
      type: Number,
    },
    quizCount: {
      type: Number,
    },
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
  },
  description: {
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
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Course", courseSchema);
