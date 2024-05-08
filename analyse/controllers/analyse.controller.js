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

export const getDashboardData = async (req, res, next) => {
  try {
    const data = await service.getDashboardData(req.params.iid);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
