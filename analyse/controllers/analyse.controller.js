import AnalyseService from "../services/analyse.service.js";

//creating a service object
const service = new AnalyseService();

//controller function of getting a course progress of a student
export const studentCourseProgress = async (req, res, next) => {
  try {
    //calling the studentCourseProgress function of the service class and getting the progress object
    const progress = await service.studentCourseProgress(
      req.params.uid,
      req.params.cid
    );

    res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};

//controller function of getting dashboard data for a instructor
export const getDashboardData = async (req, res, next) => {
  try {
    //calling the getDashboardData function of the service class and getting the data
    const data = await service.getDashboardData(req.params.iid);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
