import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SelectEL from "../../../components/form elements/SelectEL";
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

export default function AddSchedule() {
  const Item = styled(Paper)(() => ({
    backgroundColor: "rgb(20, 27, 45)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "none",
    overflow: "hidden",
    padding: 10,
    color: "white",
  }));

  const [name_of_day, setName_of_day] = useState();
  const [course, setCourse] = useState();
  const [days, setDays] = useState([
    {
      name_of_day: "monday",
      sessions: [],
    },
    {
      name_of_day: "tuesday",
      sessions: [],
    },
    {
      name_of_day: "wednesday",
      sessions: [],
    },
    {
      name_of_day: "thursday",
      sessions: [],
    },
    {
      name_of_day: "friday",
      sessions: [],
    },
    {
      name_of_day: "saturday",
      sessions: [],
    },
    {
      name_of_day: "sunday",
      sessions: [],
    },
  ]);

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
    border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setSchedule((s) => ({ ...s, days }));
  }, [days]);

  const addSession = (e) => {
    e.preventDefault();
    let parsedTime = moment(e.target.elements["startAt"].value, "hh:mm A");
    let s = parsedTime.format("HH:mm:ss");
    parsedTime = moment(e.target.elements["finishAt"].value, "hh:mm A");
    let f = parsedTime.format("HH:mm:ss");

    setDays((prevDays) =>
      prevDays.map((day) =>
        day.name_of_day === name_of_day
          ? {
              ...day,
              sessions: [
                ...day.sessions,
                {
                  lecture: e.target.elements["lecture"].value,
                  startAt: s,
                  finishAt: f,
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

  const createSchedule = () => {
    // fetch("http://localhost:80/schedule/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ schedule }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((e) => console.log(e));
  };

  return (
    <main className="content text-white flex flex-col">
      <h1 className="text-2xl m-5 min-w-fit">
        Create Schedules <CalendarMonthOutlinedIcon />
      </h1>
      <div className="flex justify-between items-center">
        <FormControl
          sx={{
            ".MuiInputLabel-root, .MuiSelect-outlined": {
              color: "white",
            },
            "&, .MuiSvgIcon-root, .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
              { color: "white" },
          }}
        >
          <SelectEL label="Course" helper="Selcet a course" minWidth={120} />
        </FormControl>
        <Button
          sx={{
            color: "white",
            borderColor: "white",
          }}
          variant="outlined"
          endIcon={<DoneOutlinedIcon />}
          onClick={createSchedule}
        >
          Create
        </Button>
      </div>

      <div className="mt-10">
        <Grid container spacing={10}>
          {days.map((day, i) => (
            <Grid key={i} item sm={3} md={6}>
              <h1 className="text-lg font-semibold mb-5">
                {day.name_of_day}
                <IconButton onClick={() => handleOpen(day.name_of_day)}>
                  <AddCircleOutlineOutlinedIcon className="text-white" />
                </IconButton>
              </h1>

              <Item>
                {day.sessions.map((ses, j) => (
                  <PaperContent
                    key={j}
                    startAt={ses.startAt}
                    finishAt={ses.finishAt}
                    lecture={ses.lecture}
                    deleteFn={() => deleteSession(i, j)}
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
            <form onSubmit={addSession} className="flex flex-col">
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
                  color: "black",
                  borderColor: "black",
                  width: 5,
                  alignSelf: "end",
                  ":hover": {
                    borderColor: "black",
                  },
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
  );
}
