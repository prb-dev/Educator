import React, { useEffect, useState } from "react";
import AdminCard from "../../components/AdminCard";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Barchart from "../../components/charts/Barchart";
import Linechart from "../../components/charts/Linechart";
import FunctionsOutlinedIcon from "@mui/icons-material/FunctionsOutlined";
import Doughnutchart from "../../components/charts/Doughnutchart";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { signoutStart, signoutSuccess } from "../../redux/user/userSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [doughnutData, setDoughnutData] = useState({});
  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});
  const [revenueBreakdown, setRevenueBreakdown] = useState({});
  const [thisMonthSt, setThisMonthSt] = useState(0);
  const [thisMonthRe, setThisMonthRe] = useState(0);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:80/analyse/dashboard/${user.user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalStudents(data.totalStudents);
        setTotalRevenue(data.totalRevenue);
        setCourseCount(data.totalCourses);
        setDoughnutData(data.counts);
        setLineData(data.courses);
        setBarData(data.courses);
        setRevenueBreakdown(data.revenue);
        const thisMonth = new Date().getMonth();
        Object.entries(data.courses).forEach(([key, value]) => {
          value.enrollmentMonths.forEach((i) => {
            if (i == thisMonth) {
              setThisMonthSt((count) => count + 1);
              setThisMonthRe((amount) => amount + value.course.price);
            }
          });
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSignout = () => {
    try {
      dispatch(signoutStart());
      dispatch(signoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Spin spinning={loading}>
      <main className="relative w-full h-[100vh] flex flex-wrap bg-gradient-to-r from-slate-200 to-white pt-16 overflow-y-scroll">
        <Button
          size="small"
          onClick={handleSignout}
          sx={{
            position: "absolute",
            top: "10px",
            right: "30px",
          }}
          startIcon={<LogoutOutlinedIcon />}
        >
          Signout
        </Button>
        <AdminCard
          title="Total Students"
          desc={totalStudents}
          icon={<PersonOutlineOutlinedIcon className="text-sky-600" />}
          count={thisMonthSt}
        />
        <AdminCard
          title="Total Courses"
          desc={courseCount}
          icon={<SchoolOutlinedIcon className="text-sky-600" />}
        />
        <AdminCard
          title="Total Revenue"
          desc={totalRevenue}
          icon={<AttachMoneyOutlinedIcon className="text-sky-600" />}
          count={thisMonthRe}
        />
        <AdminCard
          title="Revenue Breakdown"
          icon={<FunctionsOutlinedIcon className="text-sky-600" />}
          data={revenueBreakdown}
        />

        <div className="h-fit w-1/2 flex md:flex-row lg:flex-col lg:mr-5">
          <div className="h-fit w-full cursor-pointer shadow-lg hover:brightness-105 shadow-slate-200 rounded-lg p-5 m-5">
            <Doughnutchart data={doughnutData} />
          </div>
          <div className="h-fit w-full cursor-pointer shadow-lg hover:brightness-105 shadow-slate-200 rounded-lg p-5 m-5">
            <Linechart data={lineData} />
          </div>
        </div>
        <Barchart data={barData} />
      </main>
    </Spin>
  );
}
