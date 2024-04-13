import Schedule from "../models/schedule.model.js";

class ScheduleService {
  async addSchedule(schedule) {
    const { course, days } = schedule;
    const newSchedule = new Schedule({ course, days });
    await newSchedule.save();

    return newSchedule;
  }

  async deleteSchedule(scid) {
    await Schedule.findByIdAndDelete(scid);
    return { message: "Schedule deleted" };
  }

  async addDay(day, scid) {
    const schedule = await Schedule.findById(scid);
    const days = schedule.days;

    for (let i = 0; i < days.length; i++) {
      if (days[i].name_of_day === day.name_of_day) {
        throw customError(400, "Day is already added.");
      }
    }

    schedule.days.push(day);

    const updatedSchedule = await schedule.save();

    return updatedSchedule;
  }

  async deleteDay(scid, did) {
    const schedule = await Schedule.findById(scid);
    const days = schedule.days;
    let found = false;

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

  async addSession(session, scid, did) {
    const schedule = await Schedule.findById(scid);
    const days = schedule.days;
    let confict = false;

    for (let i = 0; i < days.length; i++) {
      if (days[i]._id == did) {
        const sessions = days[i].sessions;

        sessions.push(session);

        if (sessions.length > 1) {
          sessions.sort((a, b) => a.startAt - b.startAt);

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

  async deleteSession(scid, did, sid) {
    const schedule = await Schedule.findById(scid);
    const days = schedule.days;

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

  async getSchedules() {
    const schedules = await Schedule.find();
    return schedules;
  }

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
