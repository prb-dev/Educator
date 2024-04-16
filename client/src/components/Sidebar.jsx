import React from "react";
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

  const items = [
    getItem(<Link to="/">Dashboard</Link>, "Dashboard", <HomeOutlinedIcon />),
    getItem("Students", "Students", <PersonOutlineOutlinedIcon />, [
      getItem(<Link to="/students">Course1</Link>, "Course1"),
    ]),
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
    <main style={{ backgroundColor: "#141b2d" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Sider
        className="text-white"
        collapsible
        collapsedWidth={70}
        breakpoint="sm"
        style={{ backgroundColor: "#141b2d" }}
      >
        <Menu
          style={{
            width: "100%",
            borderRight: 0,
            backgroundColor: "#141b2d",
          }}
          defaultSelectedKeys={["Dashboard"]}
          items={items}
          theme="dark"
        />
      </Sider>
    </main>
  );
}
