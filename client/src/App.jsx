import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/instructor/Dashboard.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader.jsx";
import Students from "./pages/instructor/Students.jsx";
import AddSchedule from "./pages/instructor/schedule/AddSchedule.jsx";
import DeleteSchedule from "./pages/instructor/schedule/DeleteSchedule.jsx";
import EditSchedule from "./pages/instructor/schedule/EditSchedule.jsx";
import Login from "./pages/User/Login.jsx";
import Signup from "./pages/User/Signup.jsx";
import Home from "./pages/student/Home.jsx";
import NavBar from "./components/student/NavBar.jsx";
import SingleCourse from "./pages/student/SingleCourse.jsx";
import AllCourses from "./pages/student/AllCourses.jsx";
import PaymentCancel from "./pages/student/PaymentCancel.jsx";
import SuccessPayment from "./pages/student/SuccessPayment.jsx";

function App() {
  const instructor = true;

  return (
    <BrowserRouter>
      {instructor ? (
        <Layout className="app">
          <Layout>
            <Sidebar />
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/schedules/add" element={<AddSchedule />} />
                <Route path="/schedules/edit" element={<EditSchedule />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/schedules/delete" element={<DeleteSchedule />} />
              </Routes>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <Layout className="app">
          <NavBar />
          <Layout>
            {/* <Sidebar /> */}
            <Layout style={{ backgroundColor: "rgb(20, 27, 45)" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/student/course/:courseId"
                  element={<SingleCourse />}
                />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/payment-cancel" element={<PaymentCancel />} />
                <Route path="/success-payment" element={<SuccessPayment />} />
              </Routes>
            </Layout>
          </Layout>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;
