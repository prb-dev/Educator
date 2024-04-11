import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    lecture: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    finishAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const daySchema = new mongoose.Schema(
  {
    name_of_day: {
      type: String,
      required: true,
    },
    sessions: {
      type: [sessionSchema],
    },
  },
  { timestamps: true }
);

const scheduleSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    days: {
      type: [daySchema],
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
