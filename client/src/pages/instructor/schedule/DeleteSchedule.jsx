import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import {
  Button,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function DeleteSchedule() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:80/course/instructor/663b48d75d3f69cd1ec16b9c")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((d) => {
          if (d.schedule) {
            setCourses((prevCourses) => [...prevCourses, d]);
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [course, setCourse] = useState("");

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const deleteSchedule = () => {
    fetch(`http://localhost:80/schedule/${course.schedule}/${course._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="w-full h-[100vh] bg-gradient-to-r from-slate-200 to-white overflow-y-scroll p-5 text-slate-700 flex flex-col">
      <h1 className="text-2xl m-5 min-w-fit">
        Delete Schedules <CalendarMonthOutlinedIcon />
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
                <MenuItem key={c._id} value={c}>
                  {c.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={null} disabled={true}>
                No courses
              </MenuItem>
            )}
          </Select>
          <FormHelperText>Select a course</FormHelperText>
        </FormControl>
        <Button
          onClick={deleteSchedule}
          variant="outlined"
          startIcon={<DeleteOutlineOutlinedIcon />}
        >
          Delete
        </Button>
      </div>
    </main>
  );
}
