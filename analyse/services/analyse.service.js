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
