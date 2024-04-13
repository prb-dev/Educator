import { RPCRequest } from "../../enrollment/utils/message passing/rabbit_mq.js";

class AnalyseService {
  async studentCourseProgress(uid, cid) {
    let requestPayload = {
      event: "GET_USER",
      id: uid,
    };

    const user = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);

    let completedSteps;

    user.courses.forEach((c) => {
      if (c.course == cid) {
        completedSteps = c.completedSteps;
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

    let progress = 0;

    if (course.totalSteps > 0)
      progress = Math.ceil((completedSteps / course.totalSteps) * 100);

    return { progress, message: `${progress}%` };
  }
}

export default AnalyseService;
