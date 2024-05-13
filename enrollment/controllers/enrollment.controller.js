import EnrollmentService from "../services/enrollment.service.js";

//creating a service object
const service = new EnrollmentService();

//controller function to check enrollment conflicts
export const enrollmentConflictCheck = async (req, res, next) => {
  try {
    //calling the enrollmentConflictCheck function of the service class and getting the user object
    const user = await service.enrollmentConflictCheck(
      req.params.uid,
      req.params.cid
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//controller function to enroll a student
export const enroll = async (req, res, next) => {
  try {
    //calling the enrollmentConflictCheck function of the service class and getting the user object
    const user = await service.enrollmentConflictCheck(
      req.params.uid,
      req.params.cid
    );
    //calling the enroll function of the service class and getting the updated user object
    const updateUser = await service.enroll(user, req.params.cid);

    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

//controller function to unenroll a student
export const unenroll = async (req, res, next) => {
  try {
    //calling the unenroll function of the service class and getting the updated user object
    const updateUser = await service.unenroll(req.params.uid, req.params.cid);

    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};
