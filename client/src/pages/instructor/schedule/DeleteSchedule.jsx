import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Button, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function DeleteSchedule() {
  const [course, setCourse] = useState("");

  const handleCourseChange = (event) => {
    console.log(event.target.value);
    setCourse(event.target.value);
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
            <MenuItem value="{10}">Twenty</MenuItem>
            <MenuItem value="{21}">Twenty one</MenuItem>
            <MenuItem value="{22}">Twenty one and a half</MenuItem>
          </Select>
          <FormHelperText>Select a course</FormHelperText>
        </FormControl>
        <Button variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />}>
          Delete
        </Button>
      </div>
    </main>
  );
}
