import React, { useEffect, useState } from "react";
import AdminCard from "../../components/AdminCard";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Barchart from "../../components/charts/Barchart";
import Linechart from "../../components/charts/Linechart";
import Doughnutchart from "../../components/charts/Doughnutchart";
import { Spin } from "antd";

export default function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [doughnutData, setDoughnutData] = useState({});
  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:80/analyse/dashboard/663b48d75d3f69cd1ec16b9c")
      .then((res) => res.json())
      .then((data) => {
        setTotalStudents(data.totalStudents);
        setTotalRevenue(data.totalRevenue);
        setCourseCount(data.totalCourses);
        setDoughnutData(data.counts);
        setLineData(data.courses);
        setBarData(data.courses);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Spin spinning={loading}>
      <main className="w-full h-[100vh] flex flex-wrap bg-gradient-to-r from-slate-200 to-white pt-10 overflow-y-scroll">
        <AdminCard
          title="Total Students"
          desc={totalStudents}
          icon={<PersonAddOutlinedIcon className="text-sky-600" />}
        />
        <AdminCard
          title="Total Revenue"
          desc={totalRevenue}
          icon={<AttachMoneyOutlinedIcon className="text-sky-600" />}
        />
        <AdminCard
          title="Total Courses"
          desc={courseCount}
          icon={<SchoolOutlinedIcon className="text-sky-600" />}
        />
        <AdminCard
          title="Test title"
          desc="Test descc"
          icon={<PersonAddOutlinedIcon className="text-sky-600" />}
        />

        <div className="h-fit flex gap-20 cursor-pointer m-5 shadow-lg hover:brightness-105 shadow-slate-200 rounded-lg p-5">
          <Doughnutchart data={doughnutData} />
          <Linechart data={lineData} />
        </div>
        <Barchart data={barData} />
      </main>
    </Spin>
  );
}
