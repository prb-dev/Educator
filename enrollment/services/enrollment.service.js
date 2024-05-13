import { customError } from "../utils/error.js";
import { RPCRequest } from "../utils/message passing/rabbit_mq.js";

class EnrollmentService {
  //this function enrolls a student
  async enroll(user, cid) {
    //payload for updating the student
    let requestPayload = {
      event: "UPDATE_USER",
      user,
    };

    //send payload to the user queue and getting the updated user
    const updatedUser = await RPCRequest(
      process.env.USER_QUEUE_NAME,
      requestPayload
    );

    //payload for send email
    requestPayload = {
      event: "ENROLL_SUCCESS",
      receiverEmail: updatedUser.Email,
      courseName: cid,
    };

    //send payload to the notification queue
    RPCRequest(process.env.NOTIFICATION_QUEUE_NAME, requestPayload);

    return updatedUser;
  }

  //this function check for any enroll conflict
  enrollmentConflictCheck = async (uid, cid) => {
    //payload for getting the student
    let requestPayload = {
      event: "GET_USER",
      id: uid,
    };

    //send payload to the user queue and getting the user
    const user = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);

    const cids = [];

    user.courses.forEach((c) => {
      if (!c.completed) cids.push(c.course);
    });

    //check if id of the new course is already in the array
    cids.forEach((id) => {
      if (id == cid)
        throw customError(401, "You are already enrolled to this course");
    });

    //payload for getting courses
    requestPayload = {
      event: "GET_COURSES",
      cids,
    };

    //send payload to the course queue and getting courses
    const courses = await RPCRequest(
      process.env.COURSE_QUEUE_NAME,
      requestPayload
    );

    //payload for getting schedules
    requestPayload = {
      event: "GET_SCHEDULES",
    };

    //send payload to the schedule queue and getting schedules
    const schedules = await RPCRequest(
      process.env.SCHEDULE_QUEUE_NAME,
      requestPayload
    );

    let courseToEnrollSchedule;

    //find the new course schedule
    schedules.forEach((schedule) => {
      if (schedule.course == cid) {
        courseToEnrollSchedule = schedule;
      }
    });

    let overlapCid;

    //checking if there are any overlaps by looping through each session of the new course
    //and comparing it with each session of old courses
    courseToEnrollSchedule.days.forEach((outerDay) => {
      outerDay.sessions.forEach((outerSession) => {
        schedules.forEach((innerSchedule) => {
          if (innerSchedule.course !== cid) {
            innerSchedule.days.forEach((innerDay) => {
              innerDay.sessions.forEach((innerSession) => {
                const outerStartAt = outerSession.startAt.split("T")[1];
                const outerFinishAt = outerSession.finishAt.split("T")[1];
                const innerStartAt = innerSession.startAt.split("T")[1];
                const innerFinishAt = innerSession.finishAt.split("T")[1];

                if (
                  (outerStartAt <= innerStartAt &&
                    outerFinishAt >= innerStartAt) ||
                  (outerStartAt <= innerFinishAt &&
                    outerFinishAt >= innerFinishAt) ||
                  (outerStartAt >= innerStartAt &&
                    outerFinishAt <= innerFinishAt)
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

    //getting the conflicting course if any
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

    //if no issues push new id to the course array
    user.courses.push({
      course: cid,
      completedLectureCount: 0,
      completedQuizCount: 0,
      enrolledDate: new Date(),
    });

    return user;
  };

  //this funtion unenrolls a student
  async unenroll(uid, cid) {
    //payload for getting student
    let requestPayload = {
      event: "GET_USER",
      id: uid,
    };

    //send payload to the user queue and getting the student
    const user = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);

    //loop through courses array and remove the id of the course that the student want to unenroll
    for (let i = 0; i < user.courses.length; i++) {
      if (user.courses[i].course == cid) {
        user.courses.splice(i, 1);
        break;
      }
    }

    //payload for updating student
    requestPayload = {
      event: "UPDATE_USER",
      user,
    };

    //send payload to the user queue and getting the updated student
    const updatedUser = await RPCRequest(
      process.env.USER_QUEUE_NAME,
      requestPayload
    );

    return updatedUser;
  }
}

export default EnrollmentService;
