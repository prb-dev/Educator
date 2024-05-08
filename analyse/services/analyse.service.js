import { RPCRequest } from "../utils/message passing/rabbit_mq.js";

class AnalyseService {
  async studentCourseProgress(uid, cid) {
    let requestPayload = {
      event: "GET_USER",
      id: uid,
    };

    const user = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);

    let completedLectureCount;
    let completedQuizCount;

    user.courses.forEach((c) => {
      if (c.course == cid) {
        completedLectureCount = c.completedLectureCount;
        completedQuizCount = c.completedQuizCount;
      }
    });

    requestPayload = {
      event: "GET_COURSE",
      cid,
    };

    const course = await RPCRequest(
      process.env.COURSE_QUEUE_NAME,
      requestPayload
    );

    let progress;

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

    return progress;
  }

  async getDashboardData(iid) {
    let requestPayload = {
      event: "GET_COURSES_BY_INSTRUCTOR",
      iid,
    };

    const courses = await RPCRequest(
      process.env.COURSE_QUEUE_NAME,
      requestPayload
    );

    const data = {
      counts: new Map(),
      revenue: new Map(),
      courses: new Map(),
    };

    for (const course of courses) {
      data.counts.set(course._id, {
        course,
        studentCount: await this.getTotalStudents(course._id),
      });

      requestPayload = {
        event: "GET_STUDENTS",
        cid: course._id,
      };

      const students = await RPCRequest(
        process.env.USER_QUEUE_NAME,
        requestPayload
      );
      const months = [];

      students.forEach((student) => {
        student.courses.forEach((c) => {
          if (c.course == course._id) {
            const month = new Date(c.enrolledDate).getMonth();
            months.push(month);
          }
        });
      });

      data.courses.set(course._id, {
        course,
        enrollmentMonths: months,
      });
    }

    let totalStudents = 0;
    let totalRevenue = 0;

    data.counts.forEach((value, key) => {
      totalStudents += value.studentCount;

      data.revenue.set(key, {
        course: value.course,
        revenue: value.studentCount * value.course.price,
      });
    });

    data.revenue.forEach((value, key) => {
      totalRevenue += value.revenue;
    });

    data.totalStudents = totalStudents;
    data.totalRevenue = totalRevenue;

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

    return {
      counts: countsObj,
      revenue: revenueObj,
      totalStudents,
      totalRevenue,
      totalCourses: courses.length,
      courses: coursesObj,
    };
  }

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
