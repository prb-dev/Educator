import React, { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton } from "@mui/material";
import { Layout } from "antd";

const { Sider, Header, Content } = Layout;

export default function AppHeader() {
  return (
    <Header
      className="flex items-center text-white justify-between pl-5"
      style={{ backgroundColor: "#141b2d" }}
    >
      <h1 className="text-lg">Instructor panal</h1>
    </Header>
  );
}
