import { RPCRequest } from "../utils/message passing/rabbit_mq.js";
import Schedule from "../models/schedule.model.js";
import { customError } from "../utils/error.js";

class ScheduleService {
  //this function adds the schedule to the db
  async addSchedule(schedule) {
    //calling conflictCheck to check any overlaps
    this.conflictCheck(schedule);
    
    const { course, days } = schedule;
    const newSchedule = new Schedule({ course, days });
    await newSchedule.save();

    //payload to save schedule id in course db
    let requestPayload = {
      event: "SAVE_SCHEDULE",
      cid: course,
      sid: newSchedule._id,
    };

    //send payload to the course queue
    RPCRequest(process.env.COURSE_QUEUE_NAME, requestPayload);

    return newSchedule;
  }

  //this function deletes the schedule from db
  async deleteSchedule(scid, cid) {
    await Schedule.findByIdAndDelete(scid);

    //payload to remove the schedule id from course db
    let requestPayload = {
      event: "DELETE_SCHEDULE",
      cid,
    };

    //send payload to the course queue
    RPCRequest(process.env.COURSE_QUEUE_NAME, requestPayload);
    return { message: "Schedule deleted" };
  }

  //this function adds a day to the schedule
  async addDay(day, scid) {
    const schedule = await Schedule.findById(scid);
    const days = schedule.days;

    //check for conflicts
    for (let i = 0; i < days.length; i++) {
      if (days[i].name_of_day === day.name_of_day) {
        throw customError(400, "Day is already added.");
      }
    }

    schedule.days.push(day);

    //saving in the db
    const updatedSchedule = await schedule.save();

    return updatedSchedule;
  }

  //this function deleted a day from schedule
  async deleteDay(scid, did) {
    const schedule = await Schedule.findById(scid);
    const days = schedule.days;
    let found = false;

    //looping until the day math and remove it when it is a match
    for (let i = 0; i < days.length; i++) {
      if (days[i]._id == did) {
        days.splice(i, 1);
        found = true;
        break;
      }
    }

    if (found) {
      const updatedSchedule = await schedule.save();
      return updatedSchedule;
    } else throw customError(404, "Coudn't find the day");
  }

  //this function adds a session to a schedule
  async addSession(session, scid, did) {
    const schedule = await Schedule.findById(scid);
    const days = schedule.days;
    let confict = false;

    //loop throgh days and add it to the proper day
    for (let i = 0; i < days.length; i++) {
      if (days[i]._id == did) {
        const sessions = days[i].sessions;

        sessions.push(session);

        if (sessions.length > 1) {
          sessions.sort((a, b) => a.startAt - b.startAt);

          //checking for overlaps
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
      throw customError(400, "Sessions are overlapping");
    }

    const updatedSchedule = await schedule.save();

    return updatedSchedule;
  }

  //this function deletes a session from a schedule
  async deleteSession(scid, did, sid) {
    const schedule = await Schedule.findById(scid);
    const days = schedule.days;

    //loop throgh days and finding the session, then remove it
    for (let i = 0; i < days.length; i++) {
      if (days[i]._id == did) {
        const sessions = days[i].sessions;

        for (let j = 0; j < sessions.length; j++) {
          if (sessions[j]._id == sid) {
            sessions.splice(j, 1);
            break;
          }
        }
      }
    }

    const updatedSchedule = await schedule.save();

    return updatedSchedule;
  }

  //this funtion returns all schedules
  async getSchedules() {
    const schedules = await Schedule.find();
    return schedules;
  }

  //this function returns a specific schedule
  async getSchedule(cid) {
    const schedule = await Schedule.findOne({
      course: cid,
    });
    return schedule;
  }

  //this function updates a schedule
  async updateSchedule(schedule) {
    //calling conflictCheck to check any overlaps
    this.conflictCheck(schedule);

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      schedule._id,
      schedule,
      {
        new: true,
      }
    );
    return updatedSchedule;
  }

  //this fucntion checks for any session overlaps
  conflictCheck = (schedule) => {
    let conflictDay;

    for (let i = 0; i < schedule.days.length; i++) {
      for (let j = 0; j < schedule.days[i].sessions.length; j++) {
        const sessionArr = schedule.days[i].sessions;
        if (sessionArr.length > 1) {
          sessionArr.sort((a, b) => new Date(a.startAt) - new Date(b.startAt));

          for (let k = 0; k < sessionArr.length - 1; k++) {
            if (sessionArr[k].finishAt > sessionArr[k + 1].startAt) {
              conflictDay = schedule.days[i].name_of_day;
              break;
            }
          }
        }
      }
    }

    if (conflictDay) {
      throw customError(400, `${conflictDay} sessions are overlapping`);
    }
  };

  //event handler is used for rpc purposes
  async eventHandler(payload) {
    try {
      switch (payload.event) {
        case "GET_SCHEDULES":
          return this.getSchedules();
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default ScheduleService;
