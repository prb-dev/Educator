import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  signoutFail,
  signoutStart,
  signoutSuccess,
} from "../redux/user/userSlice";

const { Sider, Header, Content } = Layout;

export default function Sidebar() {
  const [courses, setCourses] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`http://localhost:80/course/instructor/${user.user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function getItem(label, key, icon, children, type, disabled) {
    return {
      key,
      icon,
      children,
      label,
      type,
      disabled,
    };
  }

  const courseLinks = courses.map((course) =>
    getItem(
      <Link to={`/students?course=${course.name}&cid=${course._id}`}>
        {course.name}
      </Link>,
      course._id
    )
  );

  const items = [
    getItem(<Link to="/">Dashboard</Link>, "Dashboard", <HomeOutlinedIcon />),
    getItem("Students", "Students", <PersonOutlineOutlinedIcon />, courseLinks),
    getItem("Schedules", "Schedules", <CalendarMonthOutlinedIcon />, [
      getItem(
        <Link to="/schedules/add">Add</Link>,
        "Add",
        <AddCircleOutlineOutlinedIcon />
      ),
      getItem(
        <Link to="/schedules/edit">Edit</Link>,
        "Edit",
        <EditOutlinedIcon />
      ),
      getItem(
        <Link to="/schedules/delete">Delete</Link>,
        "Delete",
        <DeleteOutlineOutlinedIcon />
      ),
    ]),
    getItem("Courses", "Courses", <CalendarMonthOutlinedIcon />, [
      getItem(
        <Link to="/courses/view">View</Link>,
        "cView",
        <AddCircleOutlineOutlinedIcon />
      ),
      getItem(
        <Link to="/courses/add">Add</Link>,
        "cAdd",
        <AddCircleOutlineOutlinedIcon />
      ),
    ]),
  ];

  return (
    <main className="bg-gradient-to-l from-slate-200 to-white">
      <br />
      <br />
      <h1 className="text-lg ml-5 text-slate-700">Intructor Panel</h1>
      <br />
      <br />
      <Sider
        collapsible
        collapsedWidth={70}
        breakpoint="sm"
        style={{
          background: "transparent",
        }}
      >
        <Menu
          style={{
            borderRight: 0,
            backgroundColor: "transparent",
          }}
          defaultSelectedKeys={["Dashboard"]}
          items={items}
          theme="light"
          mode="inline"
        />
      </Sider>
    </main>
  );
}
