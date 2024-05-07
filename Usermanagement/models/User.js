const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  courses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    completedLectureCount: {
      type: Number,
      default: 0
    },
    completedQuizCount: {
      type: Number,
      default: 0
    }
  }],
  password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'user','teacher'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;