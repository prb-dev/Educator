import EnrollmentService from "../services/enrollment.service.js";

const service = new EnrollmentService();

export const enrollmentConflictCheck = async (req, res, next) => {
  try {
    const user = await service.enrollmentConflictCheck(
      req.params.uid,
      req.params.cid
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const enroll = async (req, res, next) => {
  try {
    const user = await service.enrollmentConflictCheck(
      req.params.uid,
      req.params.cid
    );
    const updateUser = await service.enroll(user, req.params.cid);

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
