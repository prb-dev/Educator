import Schedule from "../models/schedule.model.js";
import { customError } from "../utils/error.js";
import { channel } from "../index.js";
import { publishMessage } from "../utils/message passing/rabbit_mq.js";

export const addSchedule = async (req, res, next) => {
  const { schedule } = req.body;
  try {
    const newSchedule = new Schedule({ course: schedule.course });
    await newSchedule.save();

    publishMessage(
      channel,
      process.env.SCHEDULE_BINDING_KEY,
      JSON.stringify({ event: "ADD_SCHEDULE", newSchedule })
    );

    res.status(201).json(newSchedule);
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req, res, next) => {
  try {
    await Schedule.findByIdAndDelete(req.params.scid);

    res.status(200).json({ message: "Schedule deleted" });
  } catch (error) {
    next(error);
  }
};

export const addDay = async (req, res, next) => {
  const { day } = req.body;
  try {
    const schedule = await Schedule.findById(req.params.scid);
    const days = schedule.days;

    for (let i = 0; i < days.length; i++) {
      if (days[i].name_of_day === day.name_of_day) {
        return next(customError(400, "Day is already added."));
      }
    }

    schedule.days.push(day);

    const updatedSchedule = await schedule.save();

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

export const deleteDay = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.params.scid);
    const days = schedule.days;
    let found = false;

    for (let i = 0; i < days.length; i++) {
      if (days[i]._id == req.params.did) {
        days.splice(i, 1);
        found = true;
        break;
      }
    }

    if (found) {
      const updatedSchedule = await schedule.save();
      res.status(200).json(updatedSchedule);
    } else return next(customError(404, "Coudn't find the day"));
  } catch (error) {
    next(error);
  }
};

export const addSession = async (req, res, next) => {
  const { session } = req.body;
  try {
    const schedule = await Schedule.findById(req.params.scid);
    const days = schedule.days;
    let confict = false;

    for (let i = 0; i < days.length; i++) {
      if (days[i]._id == req.params.did) {
        const sessions = days[i].sessions;

        sessions.push(session);

        if (sessions.length > 1) {
          sessions.sort((a, b) => a.startAt - b.finishAt);

          for (let j = 0; j < sessions.length; j++) {
            if (sessions[j].finishAt > sessions[j + 1].startAt) {
              confict = true;
              break;
            }
          }
        }
      }
    }

    if (confict) {
      return next(customError(400, "Sessions are overlapping"));
    }

    const updatedSchedule = await schedule.save();

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

export const deleteSession = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.params.scid);
    const days = schedule.days;

    for (let i = 0; i < days.length; i++) {
      if (days[i]._id == req.params.did) {
        const sessions = days[i].sessions;

        for (let j = 0; j < sessions.length; j++) {
          if (sessions[j]._id == req.params.sid) {
            sessions.splice(j, 1);
            break;
          }
        }
      }
    }

    const updatedSchedule = await schedule.save();

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};
