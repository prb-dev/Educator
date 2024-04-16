import AnalyseService from "../services/analyse.service.js";

const service = new AnalyseService();

export const studentCourseProgress = async (req, res, next) => {
  try {
    const progress = await service.studentCourseProgress(
      req.params.uid,
      req.params.cid
    );

    res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};

export const getTotalStudents = async (req, res, next) => {
  try {
    const count = await service.getTotalStudents(req.params.cid);

    res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};
