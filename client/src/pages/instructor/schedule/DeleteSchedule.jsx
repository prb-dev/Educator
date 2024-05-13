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
import { Spin, message } from "antd";
import { useSelector } from "react-redux";

export default function DeleteSchedule() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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
        setLoading(false);
        console.log(err);
      });
  }, []);

  const [course, setCourse] = useState("");

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const deleteSchedule = () => {
    setLoading(true);
    fetch(`http://localhost:80/schedule/${course.schedule}/${course._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.errorMessage)
          messageApi.open({
            type: "error",
            content: "Failed to delete the schedule",
          });
        else
          messageApi.open({
            type: "success",
            content: data.message,
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
      </Spin>
    </>
  );
}
