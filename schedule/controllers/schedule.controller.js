import ScheduleService from "../services/schedule.service.js";

const service = new ScheduleService();

export const addSchedule = async (req, res, next) => {
  const { schedule } = req.body;
  try {
    const newSchedule = await service.addSchedule(schedule);

    res.status(201).json(newSchedule);
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req, res, next) => {
  try {
    const message = await service.deleteSchedule(
      req.params.scid,
      req.params.cid
    );

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const updateSchedule = async (req, res, next) => {
  try {
    const { schedule } = req.body;
    const updatedSchedule = await service.updateSchedule(schedule);

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

export const addDay = async (req, res, next) => {
  const { day } = req.body;
  try {
    const updatedSchedule = await service.addDay(day, req.params.scid);

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

export const deleteDay = async (req, res, next) => {
  try {
    const updatedSchedule = await service.deleteDay(
      req.params.scid,
      req.params.did
    );

    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

export const addSession = async (req, res, next) => {
  const { session } = req.body;
  try {
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

export const deleteSession = async (req, res, next) => {
  try {
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

export const getSchedule = async (req, res, next) => {
  try {
    const schedule = await service.getSchedule(req.params.cid);
    res.status(200).json(schedule);
  } catch (error) {
    next(error);
  }
};
