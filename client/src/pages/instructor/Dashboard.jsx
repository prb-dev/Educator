import React, { useState } from "react";
import AdminCard from "../../components/AdminCard";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Barchart from "../../components/charts/Barchart";
import Linechart from "../../components/charts/Linechart";
import Doughnutchart from "../../components/charts/Doughnutchart";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);

  fetch("http://localhost:8003/analyse/count/661952d78ea3eb8e5af86290")
    .then((res) => res.json())
    .then((data) => setUserCount(data));

  return (
    <main className="w-full h-[100vh] flex flex-wrap bg-gradient-to-r from-slate-200 to-white pt-10 overflow-y-scroll">
      <AdminCard
        title="Total Students"
        desc={userCount}
        icon={<PersonAddOutlinedIcon className="text-green-600" />}
      />
      <AdminCard
        title="Total Revenue"
        desc="1500"
        icon={<AttachMoneyOutlinedIcon className="text-green-600" />}
      />
      <AdminCard
        title="Total Courses"
        desc="4"
        icon={<SchoolOutlinedIcon className="text-green-600" />}
      />
      <AdminCard
        title="Test title"
        desc="Test descc"
        icon={<PersonAddOutlinedIcon className="text-green-600" />}
      />

      <div className="flex gap-20 cursor-pointer m-5 border border-slate-800 bg-slate-800/5 rounded-lg p-5">
        <Doughnutchart />
        <Linechart />
      </div>
      <Barchart />
    </main>
  );
}
