import React, { useState } from "react";
import Barchart from "../../components/Barchart";
import Piechart from "../../components/Piechart";
import Linegraph from "../../components/Linegraph";
import AdminCard from "../../components/AdminCard";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);

  fetch("http://localhost:8003/analyse/count/661952d78ea3eb8e5af86290")
    .then((res) => res.json())
    .then((data) => setUserCount(data));

  return (
    <main
      className="content flex flex-wrap"
      style={{ backgroundColor: "#001529" }}
    >
      <AdminCard
        title="Total Students"
        desc={userCount}
        icon={<PersonAddOutlinedIcon style={{ color: "#4cceac" }} />}
      />
      <AdminCard
        title="Total Revenue"
        desc="1500"
        icon={<AttachMoneyOutlinedIcon style={{ color: "#4cceac" }} />}
      />
      <AdminCard
        title="Total Courses"
        desc="4"
        icon={<SchoolOutlinedIcon style={{ color: "#4cceac" }} />}
      />
      <AdminCard
        title="Test title"
        desc="Test descc"
        icon={<PersonAddOutlinedIcon style={{ color: "#4cceac" }} />}
      />
      <Linegraph />
      <Piechart />
      <Barchart />
    </main>
  );
}
