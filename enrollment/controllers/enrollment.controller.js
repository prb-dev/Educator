import EnrollmentService from "../services/enrollment.service.js";

const service = new EnrollmentService();

export const enroll = async (req, res, next) => {
  try {
    const updateUser = await service.enroll(req.params.uid, req.params.cid);

    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export const unenroll = async (req, res, next) => {
  try {
    const updateUser = await service.unenroll(req.params.uid, req.params.cid);

    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};
