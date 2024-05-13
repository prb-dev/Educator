import { customError } from "../utils/error.js";
import { RPCRequest } from "../utils/message passing/rabbit_mq.js";

class AnalyseService {
  //this function gives the course progress of a student
  async studentCourseProgress(uid, cid) {
    //payload for getting the student
    let requestPayload = {
      event: "GET_USER",
      id: uid,
    };

    //send payload to the user queue and getting the user
    const user = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);

    let completedLectureCount;
    let completedQuizCount;

    user.courses.forEach((c) => {
      if (c.course == cid) {
        completedLectureCount = c.completedLectureCount;
        completedQuizCount = c.completedQuizCount;
      }
    });

    //payload for getting the course
    requestPayload = {
      event: "GET_COURSE",
      cid,
    };

    //send payload to the course queue and getting the course
    const course = await RPCRequest(
      process.env.COURSE_QUEUE_NAME,
      requestPayload
    );

    let progress;

    //creating attributes for the progress object and set them with calculated data
    if (course.steps) {
      progress = course.steps;
      progress.completedLectureCount = completedLectureCount;
      progress.completedQuizCount = completedQuizCount;
      progress.totalSteps = course.steps.lectureCount + course.steps.quizCount;
      progress.overallProgress =
        (completedLectureCount + completedQuizCount) / progress.totalSteps;

      progress.lectureProgress =
        completedLectureCount / course.steps.lectureCount;

      progress.quizProgress = completedQuizCount / course.steps.quizCount;
    }

    //returning the progress
    return progress;
  }

  //this function gives the dashboard data for a instructor
  async getDashboardData(iid) {
    //payload for getting permission
    let requestPayload = {
      event: "INSTRUCTOR_PERMISSION",
      iid,
    };

    //send payload to the user queue and getting permission
    const permission = await RPCRequest(
      process.env.USER_QUEUE_NAME,
      requestPayload
    );

    if (!permission) {
      throw customError(401, "Only instructors can perform this task.")
    }

    //payload for getting courses of a instructor
    requestPayload = {
      event: "GET_COURSES_BY_INSTRUCTOR",
      iid,
    };

    //send payload to the course queue and getting courses
    const courses = await RPCRequest(
      process.env.COURSE_QUEUE_NAME,
      requestPayload
    );

    const data = {
      counts: new Map(),
      revenue: new Map(),
      courses: new Map(),
    };

    //set objects to the counts map by looping through courses
    for (const course of courses) {
      data.counts.set(course._id, {
        course,
        studentCount: await this.getTotalStudents(course._id),
      });

    //payload for getting students of a course
      requestPayload = {
        event: "GET_STUDENTS",
        cid: course._id,
      };

    //send payload to the user queue and getting students
      const students = await RPCRequest(
        process.env.USER_QUEUE_NAME,
        requestPayload
      );
      const months = [];

      //push the student enrolled month to the months array
      students.forEach((student) => {
        student.courses.forEach((c) => {
          if (c.course == course._id) {
            const month = new Date(c.enrolledDate).getMonth();
            months.push(month);
          }
        });
      });

    //set objects to the courses map for each course
      data.courses.set(course._id, {
        course,
        enrollmentMonths: months,
      });
    }

    let totalStudents = 0;
    let totalRevenue = 0;

    data.counts.forEach((value, key) => {
      //calculation the total number of students the instructor has
      totalStudents += value.studentCount;

      //calculating the total revenue for a course
      data.revenue.set(key, {
        course: value.course,
        revenue: value.studentCount * value.course.price,
      });
    });

    //calculating the total revenue earned by the instructor
    data.revenue.forEach((value, key) => {
      totalRevenue += value.revenue;
    });

    //setting the total students and revenue to the data obj
    data.totalStudents = totalStudents;
    data.totalRevenue = totalRevenue;

    //creating objects that can be send through a response
    const countsObj = {};
    data.counts.forEach((value, key) => {
      countsObj[key] = value;
    });
    const revenueObj = {};
    data.revenue.forEach((value, key) => {
      revenueObj[key] = value;
    });
    const coursesObj = {};
    data.courses.forEach((value, key) => {
      coursesObj[key] = value;
    });

    //returning the data as an obj
    return {
      counts: countsObj,
      revenue: revenueObj,
      totalStudents,
      totalRevenue,
      totalCourses: courses.length,
      courses: coursesObj,
    };
  }

  //this function gets the toal number of students for a course
  async getTotalStudents(cid) {
    let requestPayload = {
      event: "GET_STUDENT_COUNT",
      cid,
    };

    const count = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);

    return count;
  }
}

export default AnalyseService;
