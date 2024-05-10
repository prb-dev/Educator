import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
    getItem(<Link to="/">Courses</Link>, "Courses", <HomeOutlinedIcon />),
    getItem(
      <Link to="/payments">Payments</Link>,
      "Schedules",
      <CalendarMonthOutlinedIcon />
    ),
  ];

  return (
    <main className="bg-gradient-to-l from-slate-200 to-white">
      <br />
      <br />
      <h1 className="text-lg ml-5 text-slate-700">Admin Panel</h1>
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
