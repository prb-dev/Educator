import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";

const { Sider, Header, Content } = Layout;

export default function Sidebar() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8004/course/instructor/661b92d6108f66979562bb54")
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
      course
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
  ];

  return (
    <main className="bg-gradient-to-l from-slate-200 to-white">
      <br />
      <br />
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
