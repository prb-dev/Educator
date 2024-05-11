const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      completedLectureCount: {
        type: Number,
        default: 0,
      },
      completedQuizCount: {
        type: Number,
        default: 0,
      },
      enrolledDate: {
        type: Date,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "student", "instructor"],
    required: true,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
