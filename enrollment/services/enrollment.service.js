import { customError } from "../utils/error.js";
import { RPCRequest } from "../utils/message passing/rabbit_mq.js";

class EnrollmentService {
  async enroll(uid, cid) {
    let requestPayload = {
      event: "GET_USER",
      id: uid,
    };

    const user = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);

    const cids = [];

    user.courses.forEach((c) => {
      cids.push(c.course);
    });

    cids.forEach((id) => {
      if (id == cid)
        throw customError(401, "You are already enrolled to this course");
    });

    requestPayload = {
      event: "GET_COURSES",
      cids,
    };

    const courses = await RPCRequest(
      process.env.COURSE_QUEUE_NAME,
      requestPayload
    );

    requestPayload = {
      event: "GET_SCHEDULES",
    };

    const schedules = await RPCRequest(
      process.env.SCHEDULE_QUEUE_NAME,
      requestPayload
    );

    let courseToEnrollSchedule;

    schedules.forEach((schedule) => {
      if (schedule.course == cid) {
        courseToEnrollSchedule = schedule;
      }
    });

    let overlapCid;

    courseToEnrollSchedule.days.forEach((outerDay) => {
      outerDay.sessions.forEach((outerSession) => {
        schedules.forEach((innerSchedule) => {
          if (innerSchedule.course !== cid) {
            innerSchedule.days.forEach((innerDay) => {
              innerDay.sessions.forEach((innerSession) => {
                if (
                  outerSession.finishAt > innerSession.startAt &&
                  outerSession.startAt < innerSession.finishAt
                ) {
                  overlapCid = innerSchedule.course;
                }
              });
            });
          }
        });
      });
    });

    let overlapCourse;

    courses.forEach((course) => {
      if (course._id == overlapCid) {
        overlapCourse = course;
      }
    });

    if (overlapCourse) {
      throw customError(
        401,
        `Lectures of this course overlaps with lectures of ${overlapCourse.name} course`
      );
    }

    user.courses.push({
      course: cid,
      completedLectureCount: 0,
      completedQuizCount: 0,
    });

    requestPayload = {
      event: "UPDATE_USER",
      user,
    };

    const updatedUser = await RPCRequest(
      process.env.USER_QUEUE_NAME,
      requestPayload
    );

    requestPayload = {
      event: "ENROLL_SUCCESS",
      receiverEmail: updatedUser.email,
      courseName: cid,
    };

    RPCRequest(process.env.NOTIFICATION_QUEUE_NAME, requestPayload)

    return updatedUser;
  }

  async unenroll(uid, cid) {
    let requestPayload = {
      event: "GET_USER",
      id: uid,
    };

    const user = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);

    for (let i = 0; i < user.courses.length; i++) {
      if (user.courses[i].course == cid) {
        user.courses.splice(i, 1);
        break;
      }
    }

    requestPayload = {
      event: "UPDATE_USER",
      user,
    };

    const updatedUser = await RPCRequest(
      process.env.USER_QUEUE_NAME,
      requestPayload
    );

    return updatedUser;
  }
}

export default EnrollmentService;
