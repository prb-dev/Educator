import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PaperContent from "../../../components/PaperContent";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import moment from "moment";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { message, Spin } from "antd";

export default function EditSchedule() {
  const [courses, setCourses] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:80/course/instructor/${user.user._id}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((d) => {
          if (d.schedule) {
            setCourses((prevCourses) => [...prevCourses, d]);
          }
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const Item = styled(Paper)(() => ({
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "none",
    overflow: "hidden",
    borderRadius: 10,
  }));

  const [name_of_day, setName_of_day] = useState();
  const [course, setCourse] = useState("");
  const [days, setDays] = useState([
    {
      name_of_day: "Monday",
      sessions: [],
    },
    {
      name_of_day: "Tuesday",
      sessions: [],
    },
    {
      name_of_day: "Wednesday",
      sessions: [],
    },
    {
      name_of_day: "Thursday",
      sessions: [],
    },
    {
      name_of_day: "Friday",
      sessions: [],
    },
    {
      name_of_day: "Saturday",
      sessions: [],
    },
    {
      name_of_day: "Sunday",
      sessions: [],
    },
  ]);

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState({
    course,
    days,
  });

  const handleOpen = (name) => {
    setName_of_day(name);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setSchedule((s) => ({ ...s, days }));
  }, [days]);

  useEffect(() => {
    setLoading(true);
    if (course)
      fetch(`http://localhost:80/schedule/${user.user._id}/${course}`)
        .then((res) => res.json())
        .then((data) => {
          setSchedule(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  }, [course]);

  useEffect(() => {
    setDays(schedule.days);
  }, [schedule]);

  const addSession = (e) => {
    e.preventDefault();
    let parsedTime = moment(e.target.elements["startAt"].value, "hh:mm A");
    let s = parsedTime.format("HH:mm:ss");
    parsedTime = moment(e.target.elements["finishAt"].value, "hh:mm A");
    let f = parsedTime.format("HH:mm:ss");

    let [hours, minutes, seconds] = s.split(":").map(Number);
    let startAt = new Date();

    // Set hours, minutes, and seconds based on the time string
    startAt.setHours(hours);
    startAt.setMinutes(minutes);
    startAt.setSeconds(seconds);

    [hours, minutes, seconds] = f.split(":").map(Number);
    let finishAt = new Date();

    // Set hours, minutes, and seconds based on the time string
    finishAt.setHours(hours);
    finishAt.setMinutes(minutes);
    finishAt.setSeconds(seconds);

    startAt = startAt.toISOString();
    finishAt = finishAt.toISOString();

    setDays((prevDays) =>
      prevDays.map((day) =>
        day.name_of_day === name_of_day
          ? {
              ...day,
              sessions: [
                ...day.sessions,
                {
                  lecture: e.target.elements["lecture"].value,
                  startAt: startAt,
                  finishAt: finishAt,
                },
              ],
            }
          : day
      )
    );

    handleClose();
  };

  const deleteSession = (dIndex, sIndex) => {
    setDays((prevDays) =>
      prevDays.map((day, i) =>
        i === dIndex
          ? {
              ...day,
              sessions: day.sessions.filter((session, j) => j !== sIndex),
            }
          : day
      )
    );
  };

  const upateSchedule = () => {
    setLoading(true);
    fetch(`http://localhost:80/schedule/${user.user._id}/${course}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schedule: schedule }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.errorMessage)
          messageApi.open({
            type: "error",
            content: data.errorMessage,
          });
        else
          messageApi.open({
            type: "success",
            content: "Schedule updated successfully",
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <main className="w-full h-[100vh] bg-gradient-to-r from-slate-200 to-white text-slate-700 flex flex-col p-5 overflow-y-scroll">
          <h1 className="text-2xl m-5 min-w-fit">
            Edit Schedules <CalendarMonthOutlinedIcon />
          </h1>
          <div className="flex justify-between items-center">
            <FormControl>
              <InputLabel id="course-label">Course</InputLabel>
              <Select
                labelId="course-label"
                id="course-select"
                sx={{
                  minWidth: 120,
                }}
                value={course}
                onChange={handleCourseChange}
                autoWidth
                label="Course"
              >
                {courses.length != 0 ? (
                  courses.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={null} disabled={true}>
                    No courses have schedules
                  </MenuItem>
                )}
              </Select>
              <FormHelperText>Select a course</FormHelperText>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<DoneOutlinedIcon />}
              onClick={upateSchedule}
            >
              Done
            </Button>
          </div>

          <div className="mt-10">
            <Grid container spacing={10}>
              {days.map((day, i) => (
                <Grid key={i} item sm={3} md={6}>
                  <Item className="p-5 border border-slate-500">
                    <h1 className="text-lg font-semibold mb-5 self-start text-slate-700">
                      {day.name_of_day}
                      <IconButton onClick={() => handleOpen(day.name_of_day)}>
                        <AddCircleOutlineOutlinedIcon className="text-slate-700" />
                      </IconButton>
                    </h1>

                    {day.sessions.map((ses, j) => (
                      <PaperContent
                        key={j}
                        startAt={ses.startAt}
                        finishAt={ses.finishAt}
                        lecture={ses.lecture}
                        deleteFn={() => deleteSession(i, j)}
                        fromEdit={true}
                      />
                    ))}
                  </Item>
                </Grid>
              ))}
            </Grid>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => handleClose()}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <form
                  onSubmit={addSession}
                  className="flex flex-col text-slate-700"
                >
                  <h1>Create a session</h1>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MultiInputTimeRangeField"]}>
                      <MultiInputTimeRangeField
                        slotProps={{
                          textField: ({ position }) => ({
                            label: position === "start" ? "From" : "To",
                            id: position === "start" ? "startAt" : "finishAt",
                          }),
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <TextField
                    sx={{
                      marginTop: 2,
                    }}
                    id="lecture"
                    label="Lecture"
                    variant="outlined"
                    helperText="Type the lecture name"
                  />

                  <Button
                    sx={{
                      width: 5,
                      alignSelf: "end",
                    }}
                    variant="outlined"
                    type="submit"
                  >
                    Done
                  </Button>
                </form>
              </Box>
            </Fade>
          </Modal>
        </main>
      </Spin>
    </>
  );
}
