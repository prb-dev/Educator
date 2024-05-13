import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import CourseDetails from "./pages/UserViewCourses/courses.jsx";
import UserProfile from "./pages/User/UserProfile.jsx";
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
import ViewCourses from "./pages/instructor/Courses/ViewCourses.jsx";
import AddCourse from "./pages/instructor/Courses/AddCourse.jsx";
import EditCourse from "./pages/instructor/Courses/EditCourse.jsx";
import DashboardS from "./pages/student/Dashboard.jsx";
import { useSelector } from "react-redux";
import AdminCourses from "./pages/admin/AdminCourses.jsx";
import AdminSidebar from "./pages/admin/AdminSidebar.jsx";
import AdminPayments from "./pages/admin/AdminPayments.jsx";

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {user ? (
        user.user.role == "instructor" ? (
          <Layout className="app">
            <Layout>
              <Sidebar />
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/schedules/add" element={<AddSchedule />} />
                  <Route path="/schedules/edit" element={<EditSchedule />} />
                  <Route
                    path="/schedules/delete"
                    element={<DeleteSchedule />}
                  />
                  <Route path="/courses/view" element={<ViewCourses />} />
                  <Route path="/courses/add" element={<AddCourse />} />
                  <Route path="/courses/edit" element={<EditCourse />} />
                </Routes>
              </Layout>
            </Layout>
          </Layout>
        ) : user.user.role == "admin" ? (
          <Layout className="app">
            <Layout>
              <AdminSidebar />
              <Layout>
                <Routes>
                  <Route path="/" element={<AdminCourses />} />
                  <Route path="/payments" element={<AdminPayments />} />
                </Routes>
              </Layout>
            </Layout>
          </Layout>
        ) : (
          <Layout className="app">
            <NavBar />
            <Layout>
              {/* <Sidebar /> */}
              <Layout className="bg-gradient-to-r from-slate-200 to-white">
                <Routes>
                  <Route path="/" element={<Home />} />
                   
                  <Route
                    path="/student/course/:courseId"
                    element={<SingleCourse />}
                  />
                   <Route path="/courses/:id"  element={<CourseDetails />} />  
                  <Route path="/courses" element={<AllCourses />} />
 
                  <Route path="/StudentDashboard" element={<DashboardS/>} />
 
                  <Route path="/StudentDashboard" element={<DashboardS />} />
                  <Route path="/Userprofile" element={<UserProfile />} />
 
                  <Route path="/payment-cancel" element={<PaymentCancel />} />
                  <Route path="/success-payment" element={<SuccessPayment />} />
                </Routes>
              </Layout>
            </Layout>
          </Layout>
        )
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
           
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;
