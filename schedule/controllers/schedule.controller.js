import ScheduleService from "../services/schedule.service.js";

//creating a service object
const service = new ScheduleService();

//controller function to add a schedule to a course
export const addSchedule = async (req, res, next) => {
  const { schedule } = req.body;
  try {
    //calling the addSchedule function of the service class and getting the new schedule object
    const newSchedule = await service.addSchedule(schedule);

    res.status(201).json(newSchedule);
  } catch (error) {
    next(error);
  }
};

//controller function to delete a schedule to a course
export const deleteSchedule = async (req, res, next) => {
  try {
    //calling the deleteSchedule function of the service class and getting the message
    const message = await service.deleteSchedule(
      req.params.scid,
      req.params.cid
    );

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

//controller function to update a schedule of a course
export const updateSchedule = async (req, res, next) => {
  try {
    const { schedule } = req.body;
    //calling the updateSchedule function of the service class and getting the updated schedule
    const updatedSchedule = await service.updateSchedule(schedule);

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

//controller function to add a day to a schedule
export const addDay = async (req, res, next) => {
  const { day } = req.body;
  try {
    //calling the addDay function of the service class and getting the updated schedule
    const updatedSchedule = await service.addDay(day, req.params.scid);

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

//controller function to delete a day of a schedule
export const deleteDay = async (req, res, next) => {
  try {
    //calling the deleteDay function of the service class and getting the updated schedule
    const updatedSchedule = await service.deleteDay(
      req.params.scid,
      req.params.did
    );

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

//controller function to add a session to a schedule
export const addSession = async (req, res, next) => {
  const { session } = req.body;
  try {
    //calling the addSession function of the service class and getting the updated schedule
    const updatedSchedule = await service.addSession(
      session,
      req.params.scid,
      req.params.did
    );

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

//controller function to delete a session of a schedule
export const deleteSession = async (req, res, next) => {
  try {
    //calling the deleteSession function of the service class and getting the updated schedule
    const updatedSchedule = await service.deleteSession(
      req.params.scid,
      req.params.did,
      req.params.sid
    );

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

//controller function to get a schedule of a course
export const getSchedule = async (req, res, next) => {
  try {
    //calling the getSchedule function of the service class and getting the schedule
    const schedule = await service.getSchedule(req.params.cid);
    res.status(200).json(schedule);
  } catch (error) {
    next(error);
  }
};
